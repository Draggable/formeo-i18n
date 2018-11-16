const fs = require('fs')
const path = require('path')
const { languageList, languageFiles, enUS } = require('./index')
const langDir = path.resolve(__dirname, '../lang')
const langCount = fs.readdirSync(langDir).filter(file => /.lang$/.test(file)).length

describe('languageList', () => {
  it('should return an Array of language list objects', () => {
    expect(Array.isArray(languageList)).toBe(true)
  })

  it(`should contain a language object for every language file ${langCount}`, () => {
    expect(languageList.length).toBe(langCount)
  })

  it('language list objects should contain nativeName and locale properties', () => {
    languageList.forEach(lang => {
      expect(lang).toHaveProperty('locale')
      expect(lang).toHaveProperty('nativeName')
    })
  })
})

describe('languageFiles', () => {
  it('should contain all the definitions in languageList', () => {
    languageList.forEach(lang => {
      expect(languageFiles).toHaveProperty(lang.locale)
    })
  })
  it('should contain native name under locale key and dir', () => {
    languageList.forEach(lang => {
      expect(languageFiles[lang.locale]).toHaveProperty(lang.locale)
      expect(languageFiles[lang.locale]).toHaveProperty('dir')
    })
  })
})

describe('en-US', () => {
  it('should be defined', () => {
    expect(enUS).toBeDefined()
  })
  it("should equal languageFiles['en-US'] ", () => {
    expect(enUS).toEqual(languageFiles['en-US'])
  })
})
