const compareVersions = require("compare-versions");
const markdownIt = require("markdown-it");

const markdownItRenderer = new markdownIt();


module.exports = {
  markdownify: (str) => markdownItRenderer.renderInline(str),

  datetime: (timestamp) => new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'medium', timeStyle: 'long', hour12: false }),

  changelogSort: (changelog) => {
    if (changelog) {
      var items = Object.entries(changelog);

      items.sort((first, second) => compareVersions(second[0], first[0]));

      return Object.fromEntries(items);
    } else {
      return {};
    }
  },

  automationListSort: (obj) => obj.sort((a, b) => a[0]['name'].localeCompare(b[0]['name']))
}
