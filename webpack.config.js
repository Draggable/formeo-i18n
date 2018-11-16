const { readdirSync, readFileSync } = require('fs')
const path = require('path')
const { DefinePlugin } = require('webpack')
const langDir = path.resolve(__dirname, 'src', 'lang')

const languageFiles = readdirSync(langDir)
  .filter(file => /.lang$/.test(file))
  .reduce((acc, lang) => {
    const langFile = readFileSync(`${langDir}/${lang}`).toString()
    const fileName = path.basename(lang)
    const locale = fileName.substr(0, fileName.indexOf('.'))
    acc[locale] = langFile
    return acc
  }, {})

module.exports = {
  mode: 'production',
  target: 'web',
  entry: './src/js/index.js',
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'formeoI18n',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new DefinePlugin({
      FORMEO_LANGUAGES: JSON.stringify(languageFiles),
    }),
  ],
}
