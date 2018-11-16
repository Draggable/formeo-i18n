const { languageFiles, enUS } = require('./index')

describe('languageFiles', () => {
  it('should contain all the definitions in languageList', () => {
    Object.entries(languageFiles).forEach(([locale, lang]) => {
      expect(typeof lang).toBe('string')
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
