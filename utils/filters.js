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
}
