const depctrl = require('./depctrl.js');

module.exports = async function () {
  var feedData = await depctrl.getData();
  var allMacros = [];
  for (feedId of Object.keys(feedData)) {
    feed = feedData[feedId];
    for (macroId of Object.keys(feed['macros'] || {})) {
      macro = feed['macros'][macroId];
      macro['feedId'] = feedId;
      macro['id'] = macroId;
      allMacros.push(macro);
    }
  }
  return allMacros;
};
