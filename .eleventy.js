const compareVersions = require("compare-versions");
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const markdownIt = require("markdown-it");

const markdownItRenderer = new markdownIt();


module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter("markdownify", (str) => {
        return markdownItRenderer.renderInline(str);
    });

    eleventyConfig.addFilter("datetime", (timestamp) => {
        return new Date(timestamp).toLocaleString('en-US', { timeZone : 'UTC', dateStyle: 'medium', timeStyle: 'long', 'hour12': false});
    });

    eleventyConfig.addFilter("changelogSort", function (changelog) {
        if (changelog) {
            var items = Object.entries(changelog);

            items.sort((first, second) => {
                return compareVersions(second[0], first[0]);
            });

            return Object.fromEntries(items);
        } else {
            return {};
        }
    });

    eleventyConfig.addFilter("automationListSort", function (obj) {
        return obj.sort((a, b) => a[0]['name'].localeCompare(b[0]['name']));
    });

    eleventyConfig.addPlugin(eleventyPluginFilesMinifier);

    return {
        dir: {
            input: "src/",
            output: "_site",
            includes: "_includes",
            layouts: "_layouts"
        },
        templateFormats: ["html", "md", "njk"],
        htmlTemplateEngine: "njk",
    };
};
