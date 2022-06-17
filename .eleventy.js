const markdownIt = require("markdown-it");
const markdownItRenderer = new markdownIt();
const compareVersions = require('compare-versions');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/static');
    eleventyConfig.addFilter('markdownify', (str) => {
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

    return {
        dir: {
            input: "src/",
            output: "_site",
            includes: "_includes",
            layouts: "_layouts"
        },
        passthroughFileCopy: true,
        templateFormats: ["html", "md", "njk"],
        htmlTemplateEngine: "njk",
    };
};
