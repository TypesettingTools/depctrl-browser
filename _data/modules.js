const depctrl = require('./depctrl.js');

module.exports = async function () {
  var feedData = await depctrl.getData();
  var allModules = [];
  for (feedId of Object.keys(feedData)) {
    feed = feedData[feedId];
    for (moduleId of Object.keys(feed['modules'] || {})) {
      dcModule = feed['modules'][moduleId];
      dcModule['feedId'] = feedId;
      dcModule['id'] = moduleId;
      allModules.push(dcModule);
    }
  }
  return allModules;
};
