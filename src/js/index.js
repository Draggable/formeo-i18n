const fs = require('fs')
const path = require('path')
const { default: mi18n } = require('mi18n')
const langDir = path.resolve(__dirname, '../lang')

/**
 * Array of processed languages files.
 */
const languageFiles = fs
  .readdirSync(langDir)
  .filter(file => /.lang$/.test(file))
  .reduce((acc, lang) => {
    const langFile = fs.readFileSync(`${langDir}/${lang}`).toString()
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
  nativeName: val[key],
}))

const langsByLocale = Object.entries(languageFiles).reduce((acc, [key, val]) => {
  acc[key.replace('-', '')] = val
  return acc
}, {})

module.exports = { languageFiles, languageList, ...langsByLocale }
