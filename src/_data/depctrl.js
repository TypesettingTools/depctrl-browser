const EleventyFetch = require("@11ty/eleventy-fetch");
const crypto = require("crypto");
const pLimit = require('p-limit');

// limit to 5 fetches
const limit = pLimit(5);

const seedFeed = "https://raw.githubusercontent.com/TypesettingTools/DependencyControl/master/DependencyControl.json";
var procesesed = [];

const limitedWebRequest = async (url, type) => {
  return limit((url, type) => EleventyFetch(url, {
    duration: "1d",
    type: type
  }), url, type);
}

// check hashes of all files in a feed
const checkFileIntegrity = async (feeds) => {
  for (var feed of feeds) {
    var feedHashesValid = true;
    for (var automation of Object.values({ ...feed.macros, ...feed.modules })) {
      var automationHashesValid = true;
      for (var channel of Object.values(automation.channels)) {
        for (var file of channel.files) {
          if (!file.delete) {
            await limitedWebRequest(file.url, "buffer")
              .then((fileResponse) => crypto.createHash('sha1').update(fileResponse).digest('hex'))
              .catch((error) => {
                console.log(error);
                return "";
              })
              .then((fileHash) => {
                file["_validHash"] = (fileHash.toUpperCase() === file.sha1.toUpperCase());
                feedHashesValid = feedHashesValid && file["_validHash"];
                automationHashesValid = automationHashesValid && file["_validHash"];
              });
          }
        }
      }
      automation["_validHash"] = automationHashesValid;
    }
    feed["_validHash"] = feedHashesValid;
  }
  return feeds;
}

const extractProperty = (script, property) => {
  var match = Array.from(script.matchAll(new RegExp(`\\s*${property}\\s*=\\s*(?:tr)?(?:"([^"]*)"|'([^']*)')`, 'g')));
  if (match.length === 1) {
    return (match[0][1] || "") + (match[0][2] || "");
  }
  return null;
}

const extractFeedData = (script) => {
  var match = Array.from(script.matchAll(/\n(?:[^-][^-].*)?(?:DependencyControl|require\('l0\.DependencyControl'\))\s*\(?\s?{((?:[^{}]+|{(?:[^{}]+|{[^{}]*})*})*)}/g));
  if (match.length === 1) {
    feedData = match[0][1];
    var feed = Array.from(feedData.matchAll(/^[^{]*feed\s*[:=]\s*["']([^"']+)["']/g));
    if (feed.length === 1) {
      return {feed: feed[0][1]}
    }
  }
  return null;
}

// extracts data from lua or moon macros and saves it alongside feed data
const extractScriptData = async (feeds) => {
  for (var feed of feeds) {
    for (var [macroID, macro] of Object.entries(feed.macros || {})) {
      var defaultChannel = Object.values(macro.channels).filter((c) => c.default)[0];
      macro["_defaultVersion"] = defaultChannel.version;

      var urls = Object.values(defaultChannel.files)
        .filter((f) => f.type !== "test" && !f.delete)
        .map((f) => f.url);
      if (urls.length !== 1) {
        continue;
      }

      var url = urls[0];
      if (url.endsWith(".lua") || url.endsWith(".moon")) {
        var script = (await limitedWebRequest(url, "buffer")).toString();
        var scriptData = {
          "name": extractProperty(script, "script_name"),
          "description": extractProperty(script, "script_description"),
          "author": extractProperty(script, "script_author"),
          "version": extractProperty(script, "script_version"),
          "namespace": extractProperty(script, "script_namespace")
        }
        macro["_scriptData"] = scriptData;
        macro["_scriptData"]["_feedData"] = extractFeedData(script);
      } else {
        continue;
      }
    }
  }
  return feeds;
}

// fetch single feed
const fetchFeed = (url) => {
  return limitedWebRequest(url, "text")
    .then((feedResponse) => {
      // remove trailing commas. Not ideal as there can be false positives
      if (feedResponse.match(/\,(?=\s*?[\}\]])/g)) {
        feedResponse = feedResponse.replaceAll(/\,(?=\s*?[\}\]])/g, "");
        var defective = "Trailing Comma"
      }

      // remove UTF-8 Bom
      if (feedResponse.match(/^\uFEFF/gm)) {
        feedResponse = feedResponse.replace(/^\uFEFF/g, "");
        var defective = "UTF-8 BOM"
      }

      try {
        feedJson = JSON.parse(feedResponse);
      } catch (error) {
        console.error(error);
        feedJson = { "_invalid": true }
      }

      if (defective) {
        feedJson["_defective"] = defective;
      }

      feedJson["_sourceUrl"] = url;
      feedJson["_identifier"] = crypto.createHash("sha1").update(url).digest("hex").slice(0, 7);
      feedJson["_fetchTime"] = Date.now();

      return feedJson;
    });
};

// recursively fetch all feeds
const fetchAllFeeds = (feed) => {
  procesesed.push(feed);
  return fetchFeed(feed).then(async (feedJson) => {
    // fetch unprocessed new feeds
    let otherFeeds = await Promise.all(
      Object.values(feedJson["knownFeeds"] || {})
        .filter((f) => !procesesed.includes(f))
        .map(fetchAllFeeds));
    otherFeeds = otherFeeds.flatMap(x => x);
    return [feedJson, ...otherFeeds]
  });
}

function fillTemplateVar(data, repDict = {}, parentKey = "", depth = 0) {
  // Collect Regular Variables
  // Implemented after info at https://github.com/TypesettingTools/DependencyControl#template-variables
  switch (depth) {
    case 1: // Feed Information
      repDict["feedName"] = data["name"] || "";
      repDict["baseUrl"] = data["baseUrl"] || "";
      for (let [extFeedId, extFeedURL] of Object.entries(data["knownFeeds"] || {})) {
        repDict["feed:" + extFeedId] = extFeedURL;
      }
      break;
    case 3: // Script Information
      repDict["namespace"] = parentKey;
      repDict["namespacePath"] = parentKey.replaceAll(".", "/");
      repDict["scriptName"] = data["name"] || "";
      break;
    case 5: // Version Information
      repDict["channel"] = parentKey;
      repDict["version"] = data["version"] || "";
      break;
    case 7: // File Information
      repDict["platform"] = data["version"] || "";
      repDict["fileName"] = data["name"] || "";
      break;
  }

  // Collect "Rolling" Variables
  if ("fileBaseUrl" in data) {
    // Create repDict entry if not already existant
    repDict["fileBaseUrl"] = repDict["fileBaseUrl"] || "";
    // Do template replacement on fileBaseUrl
    for (let [repName, repVal] of Object.entries(repDict)) {
      data["fileBaseUrl"] = data["fileBaseUrl"].replaceAll("@{" + repName + "}", repVal);
    }
    // Write fileBaseUrl back to repDict
    repDict["fileBaseUrl"] = data["fileBaseUrl"];
  }

  // Go through data object
  for (let [key, entry] of Object.entries(data)) {
    switch (typeof (entry)) {
      case "string":
        // Do template replacement
        for (let [repName, repVal] of Object.entries(repDict)) {
          data[key] = data[key].replaceAll("@{" + repName + "}", repVal);
        }
        break;
      case "object":
        // Recursively walk through tree
        data[key] = fillTemplateVar(data[key], { ...repDict }, key, depth + 1);
        break;
    }
  }
  return data;
}

// store data locally to not compute feeds multiple times
const data = fetchAllFeeds(seedFeed)
  .then(fillTemplateVar)
  .then(checkFileIntegrity)
  .then(extractScriptData);

module.exports.getData = () => data;
