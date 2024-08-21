const filters = require("./utils/filters.js")
const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const htmlmin = require("html-minifier-terser");

module.exports = function (eleventyConfig) {

  eleventyConfig.addGlobalData("generated", () => {
    let now = new Date();
    return new Intl.DateTimeFormat(
      "en-GB", { dateStyle: "medium", timeStyle: "long", timeZone: "UTC" }
    ).format(now);
  });

  // Add Filters 
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html") && process.env.NODE_ENV === "production") {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
    }
    return content;
  });

  eleventyConfig.on("afterBuild", () => {
    return esbuild.build({
      entryPoints: ["_site/_esbuild/app.scss", "_site/_esbuild/app.js"],
      outdir: "_site/assets",
      bundle: true,
      legalComments: "linked",
      minify: process.env.NODE_ENV === "production",
      sourcemap: process.env.NODE_ENV !== "production",
      plugins: [sassPlugin()]
    });
  });

  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addWatchTarget("./src/js/");

  return {
    dir: {
      input: "src/",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
