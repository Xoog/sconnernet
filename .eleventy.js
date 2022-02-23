const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItEmoji = require('markdown-it-emoji')

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight)

  // To enable merging of tags
  eleventyConfig.setDataDeepMerge(true)

  // Copy these static files to _site folder
  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('src/manifest.json')

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_alias: 'post_excerpt',
    excerpt_separator: '<!-- excerpt -->'
  })
  // To create a filter to determine duration of post
  eleventyConfig.addFilter('readTime', (value) => {
    const content = value
    const textOnly = content.replace(/(<([^>]+)>)/gi, '')
    const readingSpeedPerMin = 450
    return Math.max(1, Math.floor(textOnly.length / readingSpeedPerMin))
  })

  // Enable us to iterate over all the tags, excluding posts and all
  eleventyConfig.addCollection('tagList', collection => {
    const tagsSet = new Set()
    collection.getAll().forEach(item => {
      if (!item.data.tags) return
      item.data.tags
        .filter(tag => !['posts', 'all'].includes(tag))
        .forEach(tag => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  })

  /**
     * Set custom markdown library instance...
     * and support for Emojis in markdown...
     * ...because why not control our .MD files and have Emojis built in?
     * @link https://www.11ty.dev/docs/languages/markdown/#optional-set-your-own-library-instance
     * @link https://www.npmjs.com/package/markdown-it-emoji
     *
     */
  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }
  let markdownLib = markdownIt(options).use(markdownItEmoji)
  eleventyConfig.setLibrary('md', markdownLib)
  
  // asset_img shortcode
  eleventyConfig.addLiquidShortcode('asset_img', (filename, alt) => {
    return `<img class="my-4" src="/assets/img/posts/${filename}" alt="${alt}" />`
  })

  return {
    dir: {
      input: 'src'
    }
  }
}
