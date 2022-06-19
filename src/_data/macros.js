const depctrl = require("./depctrl.js");

// exports an array of all macros
module.exports = () => {
  return depctrl.getData()
    .then(feedData => feedData.flatMap(feed => {
      let macros = Object.entries(feed["macros"] || {});
      return macros.map(singleMacro => {
        singleMacro[1]["_originFeed"] = feed["_sourceName"];
        singleMacro[1]["_namespace"] = singleMacro[0];
        return singleMacro[1];
      });
    }));
}
