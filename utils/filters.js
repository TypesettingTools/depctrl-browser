const compareVersions = require("compare-versions");
const markdownIt = require("markdown-it");
const crypto = require("crypto");
const markdownItRenderer = new markdownIt();


module.exports = {
  markdownify: (str) => markdownItRenderer.renderInline(str),

  datetime: (timestamp) => new Date(timestamp).toLocaleString('en-GB', { timeZone: 'UTC', dateStyle: 'medium', timeStyle: 'long'}),

  changelogSort: (changelog) => {
    if (changelog) {
      var items = Object.entries(changelog);

      items.sort((first, second) => compareVersions(second[0], first[0]));

      return Object.fromEntries(items);
    } else {
      return {};
    }
  },

  automationListSort: (obj) => obj.sort((a, b) => a[0]['name'].localeCompare(b[0]['name'])),

  updateListSort: (obj) => obj.sort((a, b) => {
    if (a['releaseDate'] === undefined) {
      return 1;
    } else if (b['releaseDate'] === undefined) {
      return -1;
    }
    let dateA = Date.parse(a['releaseDate']) || 0;
    let dateB = Date.parse(b['releaseDate']) || 0;
    return dateB - dateA;
  }),

  singleValue: (list, key) => {
    var lastValue = null;
    for (let elm of list) {
      if (lastValue === null) {
        lastValue = elm[key];
      } else if (elm[key] !== lastValue) {
        return "Multiple Values";
      }
    }
    return lastValue;
  },

  toFeedIdentifier: (url) => crypto.createHash("sha1").update(url).digest("hex").slice(0, 7),

  getLatestUpdateDate: (updates) => {
    let latestDate = null;
    for (let update of updates) {
      let updateDate = Date.parse(update['releaseDate']) || 0;
      if (latestDate === null || updateDate > latestDate) {
        latestDate = updateDate;
      }
    }
    return latestDate;
  },

  dateToRfc3339: (date) => {
    let timestamp
    if (typeof date === "string") {
      timestamp = Date.parse(date);
    } else {
      timestamp = date
    }
    let parsedDate = new Date(0);
    if (!isNaN(timestamp)) {
      parsedDate = new Date(timestamp);
    }
    let s = parsedDate.toISOString();

    // remove milliseconds
    let split = s.split(".");
    split.pop();

    return split.join("") + "Z";
  },
}
