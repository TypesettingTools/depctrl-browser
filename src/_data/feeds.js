const depctrl = require('./depctrl.js');

// exports an array of all feeds
module.exports = async function () {
  var feedData = await depctrl.getData();
  var allFeeds = [];
  for (feedId of Object.keys(feedData)) {
    feed = feedData[feedId];
    feed['id'] = feedId;
    allFeeds.push(feed);
  }
  return allFeeds;
};
