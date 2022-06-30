const depctrl = require("./depctrl.js");

// exports an array of all modules
module.exports = () => {
  return depctrl.getData()
    .then(feedData => feedData.flatMap(feed => {
      let modules = Object.entries(feed["modules"] || {});
      return modules.map(singleModule => {
        singleModule[1]["_feedName"] = feed["name"];
        singleModule[1]["_feedIdentifier"] = feed["_identifier"];
        singleModule[1]["_fetchTime"] = feed["_fetchTime"];
        singleModule[1]["_sourceUrl"] = feed["_sourceUrl"];
        singleModule[1]["_namespace"] = singleModule[0];
        return singleModule[1];
      });
    })
      .reduce((acc, d) => {
        const found = acc.find(a => a[0]["_namespace"] === d["_namespace"]);
        if (!found) {
          acc.push([d])
        } else {
          found.push(d)
        }
        return acc;
      }, [])
    );
}
