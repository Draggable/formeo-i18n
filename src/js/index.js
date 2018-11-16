/* global FORMEO_LANGUAGES */

/**
 * Array of processed languages files.
 */
const languageFiles = FORMEO_LANGUAGES

const langsByLocale = Object.entries(languageFiles).reduce((acc, [key, val]) => {
  acc[key.replace('-', '')] = val
  return acc
}, {})

module.exports = { languageFiles, ...langsByLocale }
