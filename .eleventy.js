const now = String(Date.now())
const htmlmin = require('html-minifier')
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // plugins
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addWatchTarget('./styles/tailwind.config.js');
  eleventyConfig.addWatchTarget('./styles/tailwind.css');

  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' });

  eleventyConfig.addShortcode('version', function () {
    return now
  });

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified
    }
  
    return content
  });
};
