const EleventyFetch = require("@11ty/eleventy-fetch");

var feedQueue = [['DependencyControl', 'https://raw.githubusercontent.com/TypesettingTools/DependencyControl/master/DependencyControl.json']];
var procesesed = [];
var feedData = {};

async function processFeed(name, url) {
  if (procesesed.includes(url))
    return;

  try {
    var feedResponse = await EleventyFetch(url, {
      duration: "1d",
      type: "text",
      verbose: true
    });
    // remove trailing commas
    feedResponse = feedResponse.replace(/,[ \t\r\n]+}/, "}");
    feedResponse = feedResponse.replace(/,[ \t\r\n]+\]/, "]");
    // remove UTF-8 Bom
    feedResponse = feedResponse.replace(/^\uFEFF/gm, "");
    feedJson = JSON.parse(feedResponse);
    feedJson['_sourceUrl'] = url;

  } catch (error) {
    console.error(`json feed ${name} invalid: ${url}`);
    console.error(error);
    procesesed.push(url);
    return;
  }
  feedData[name] = feedJson;
  knownFeeds = feedJson['knownFeeds'] || {};

  feedQueue = feedQueue.concat(Object.entries(knownFeeds));
  procesesed.push(url);
}

function fillTemplateVar(data, repDict = {}, depth = 0, parentKey = "") {
  // Fill in Regular Variables
  switch(depth) {
    case 1:
      repDict['feedName'] = data['name'] || "";
      repDict['baseUrl'] = data['baseUrl'] || "";
      for (let [extFeedId, extFeedURL] of Object.entries(data['knownFeeds'] || {})) {
        repDict['feed:' + extFeedId] = extFeedURL;
      }
      break;
    case 3:
      repDict['namespace'] = parentKey;
      repDict['namespacePath'] = parentKey.replace('.', '/');
      repDict['scriptName'] = data['name'] || "";
      break;
    case 5:
      repDict['channel'] = parentKey;
      repDict['version'] = data['version'] || "";
      break;
    case 7:
      repDict['platform'] = data['version'] || "";
      repDict['fileName'] = data['name'] || "";
      break;
  }

  // Fill in "Rolling" Variables
  if ('fileBaseUrl' in data) {
    // Create repDict entry if not already existant
    repDict['fileBaseUrl'] = repDict['fileBaseUrl'] || '';
    // Do template replacement on fileBaseUrl
    for (let [repName, repVal] of Object.entries(repDict)) {
      data['fileBaseUrl'] = data['fileBaseUrl'].replace('@{' + repName +'}', repVal);
    }
    // Write fileBaseUrl back to repDict
    repDict['fileBaseUrl'] = data['fileBaseUrl'];
  }

  // Iterate through tree
  for (let [key, entry] of Object.entries(data)) {
    switch(typeof(entry)) {
      case 'string':
        for (let [repName, repVal] of Object.entries(repDict)) {
          data[key] = data[key].replace('@{' + repName +'}', repVal);
        }
        break;
      case 'object':
        fillTemplateVar(data[key], {...repDict}, depth + 1, key);
        break;
    }
  }
}

module.exports.getData = async function() {
  while (feedQueue.length !== 0) {
    feed = feedQueue.pop();
    await processFeed(...feed);
  }
  fillTemplateVar(feedData)
  return feedData;
}
