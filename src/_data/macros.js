const depctrl = require("./depctrl.js");

// exports an array of all macros
module.exports = () => {
  return depctrl.getData()
    .then(feedData => feedData.flatMap(feed => {
      let macros = Object.entries(feed["macros"] || {});
      return macros.map(singleMacro => {
        singleMacro[1]["_feedName"] = feed["name"];
        singleMacro[1]["_feedIdentifier"] = feed["_identifier"];
        singleMacro[1]["_namespace"] = singleMacro[0];
        return singleMacro[1];
      });
    }));
}
