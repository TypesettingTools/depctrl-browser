const compareVersions = require("compare-versions");
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const markdownIt = require("markdown-it");

const markdownItRenderer = new markdownIt();


module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter("markdownify", (str) => {
        return markdownItRenderer.renderInline(str);
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
