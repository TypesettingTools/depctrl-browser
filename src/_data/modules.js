const depctrl = require("./depctrl.js");

// exports an array of all modules
module.exports = () => {
  return depctrl.getData()
    .then(feedData => feedData.flatMap(feed => {
      let modules = Object.entries(feed["modules"] || {});
      return modules.map(singleModule => {
        singleModule[1]["_feedName"] = feed["name"];
        singleModule[1]["_feedIdentifier"] = feed["_identifier"];
        singleModule[1]["_namespace"] = singleModule[0];
        return singleModule[1];
      });
    }));
}
