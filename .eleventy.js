module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/static');

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
