const EleventyFetch = require("@11ty/eleventy-fetch");
const crypto = require('crypto');

const seedFeed = ["DependencyControl", "https://raw.githubusercontent.com/TypesettingTools/DependencyControl/master/DependencyControl.json"];
var procesesed = [];

// fetch single feed
const fetchFeed = (name, url) => {
  return EleventyFetch(url, {
    duration: "1d",
    type: "text"
  }).then((feedResponse) => {
    // remove trailing commas
    feedResponse = feedResponse.replace(/,[ \t\r\n]+}/, "}");
    feedResponse = feedResponse.replace(/,[ \t\r\n]+\]/, "]");

    // remove UTF-8 Bom
    feedResponse = feedResponse.replace(/^\uFEFF/gm, "");

    feedJson = JSON.parse(feedResponse);
    feedJson["_sourceUrl"] = url;
    feedJson["_sourceName"] = name;
    feedJson["_identifier"] = crypto.createHash("sha1").update(url).digest('hex').slice(0, 7);

    return feedJson;
  })
};

// recursively fetch all feeds
const fetchAllFeeds = (feed) => {
  let [name, url] = feed;
  procesesed.push(url);
  return fetchFeed(name, url).then(async (feedJson) => {
    // fetch unprocessed new feeds
    let otherFeeds = await Promise.all(
      Object.entries(feedJson["knownFeeds"] || {})
        .filter((f) => !procesesed.includes(f[1]))
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
      repDict["namespacePath"] = parentKey.replace(".", "/");
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
      data["fileBaseUrl"] = data["fileBaseUrl"].replace("@{" + repName + "}", repVal);
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
          data[key] = data[key].replace("@{" + repName + "}", repVal);
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
const data = fetchAllFeeds(seedFeed).then(fillTemplateVar);

module.exports.getData = () => data;
