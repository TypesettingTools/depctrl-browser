const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const filters = require('./utils/filters.js')


module.exports = function (eleventyConfig) {

  // Add Filters 
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

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
