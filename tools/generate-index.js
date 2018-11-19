const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { resolve, basename } = require('path')
const template = require('lodash/template')
const langDir = resolve(__dirname, '../src', 'lang')

const iconWritePath = resolve(__dirname, '../src/js/index.js')
const iconTemplatePath = resolve(__dirname, './index.tpl')
const tmpl = readFileSync(iconTemplatePath).toString()
const compiled = template(tmpl)

const languageFiles = readdirSync(langDir)
  .filter(file => /.lang$/.test(file))
  .reduce((acc, lang) => {
    const langFile = readFileSync(`${langDir}/${lang}`).toString()
    const fileName = basename(lang)
    const locale = fileName.substr(0, fileName.indexOf('.'))
    acc[locale] = langFile
    return acc
  }, {})

const langs = Object.keys(languageFiles)
  .map(key => `export const ${key.replace('-', '')} = languageFiles['${key}']`)
  .join('\n')

writeFileSync(iconWritePath, compiled({ languageFiles: JSON.stringify(languageFiles), langs }))
