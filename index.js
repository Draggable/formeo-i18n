const fs = require('fs')
const path = require('path')
const { default: mi18n } = require('mi18n')

/**
 * Array of processed languages files.
 */
const languageFiles = fs
  .readdirSync(__dirname)
  .filter(file => /.lang$/.test(file))
  .reduce((acc, lang) => {
    const langFile = fs.readFileSync(path.resolve(__dirname, lang)).toString()
    const fileName = path.basename(lang)
    const locale = fileName.substr(0, fileName.indexOf('.'))
    acc[locale] = mi18n.processFile(langFile)
    return acc
  }, {})

/**
 * List of language locales and labels.
 * Useful for generating language select UI
 */
const languageList = Object.entries(languageFiles).map(([key, val]) => ({
  locale: key,
  nativeName: val[key]
}))

module.exports = { languageFiles, languageList }
