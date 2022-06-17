const EleventyFetch = require("@11ty/eleventy-fetch");

var feedQueue = [['DependencyControl', 'https://raw.githubusercontent.com/TypesettingTools/DependencyControl/master/DependencyControl.json']];
var procesesed = [];
var feedData = {};

async function processFeed(name, url) {
  if (procesesed.includes(name))
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

  } catch (error) {
    console.error(`json feed ${name} invalid: ${url}`);
    console.error(error);
    procesesed.push(name);
    return;
  }
  feedData[name] = feedJson;
  knownFeeds = feedJson['knownFeeds'] || {};

  // filter out "this" feed used here https://github.com/TypesettingTools/ffi-experiments/blob/master/DependencyControl.json
  if (knownFeeds.hasOwnProperty('this')) {
    delete knownFeeds['this']
  }

  feedQueue = feedQueue.concat(Object.entries(knownFeeds));
  procesesed.push(name);
}

module.exports.getData = async function() {
  while (feedQueue.length !== 0) {
    feed = feedQueue.pop();
    await processFeed(...feed);
  }
  return feedData;
}

