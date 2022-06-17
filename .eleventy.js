const markdownIt = require("markdown-it");
const markdownItRenderer = new markdownIt();

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/static');
	eleventyConfig.addFilter('markdownify', (str) => {
		return markdownItRenderer.renderInline(str);
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
