const depctrl = require("./depctrl.js");

// exports an array of all updates
module.exports = () => {
  return depctrl.getData()
    .then(feedData => feedData.flatMap(feed => {
      let automations = Object.entries(feed["macros"] || {});
      //automations.push(...Object.entries(feed["modules"] || {}));
      return automations.map(([namespace, singleAutomation]) => {
        let defaultChannel = Object.values(singleAutomation.channels).filter((c) => c.default)[0];
        if (defaultChannel === undefined) {
          defaultChannel = Object.values(singleAutomation.channels)[0];
        }
        let updateData = {}
        updateData["namespace"] = namespace;
        updateData["feed"] = feed.name;
        updateData["name"] = singleAutomation.name;
        updateData["version"] = defaultChannel.version;
        updateData["releaseDate"] = defaultChannel.released;
        updateData["changelog"] = (singleAutomation.changelog || {})[defaultChannel.version] || [];
        return updateData;
      });
    })
    );
}
