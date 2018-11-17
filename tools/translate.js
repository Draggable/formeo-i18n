// This is a temporary script for generating missing
// language files until contributors can add them

const { writeFile } = require('fs')
const { default: mi18n } = require('mi18n')
const chunk = require('lodash/chunk')
const path = require('path')
const { Translate } = require('@google-cloud/translate')
const { languageFiles } = require('../dist/main.min.js')
const [fromLang, toLang, toLocale] = process.argv.slice(2)
const projectId = 'formeo-1344'

// Supported toLang
// https://cloud.google.com/translate/docs/languages

const credentialsFile = path.resolve(__dirname, '../../', 'GOOGLE_APPLICATION_CREDENTIALS.json')
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsFile

// Instantiates a client
const translate = new Translate({ projectId })
const processedFile = mi18n.processFile(languageFiles[fromLang])
// Google translation API has a limit of 128
const chunked = chunk(Object.entries(processedFile), 128)

const translated = chunked.map(langChunk => {
  const keys = langChunk.map(([key]) => key)
  const vals = langChunk.map(keyVal => keyVal[1])
  return translate
    .translate(vals, toLang)
    .then(results => {
      const [translations] = results
      return translations.map((t, i) => [keys[i], t])
    })
    .catch(err => {
      console.error('ERROR:', err)
    })
})

Promise.all(translated).then(translatedChunks => {
  const langs = translatedChunks.reduce((acc, cur) => acc.concat(cur), [])
  const translatedLang = langs.reduce((acc, [key, val]) => {
    acc.push(`${key} = ${val}`)
    return acc
  }, [])

  writeFile(path.resolve(__dirname, '../src/lang', `${toLocale}.lang`), translatedLang.join('\n'), function(err) {
    if (err) {
      return console.log(err)
    }

    console.log(`Created ${toLocale}.lang`)
  })
})
