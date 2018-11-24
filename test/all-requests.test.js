'use strict'

const supertestCheerio = require('../lib/index.js')
const request = require('superagent')
const agent = request.agent().use(supertestCheerio)
const cheerio = require('cheerio')
const nock = require('nock')

describe('superagent-cheerio', () => {
  beforeAll(() => {
    nock('http://server')
      .get('/some.html')
      .reply(200, '<html><title>foo</title><body>bar</body></html>', {
        'content-type': 'text/html'
      })
    nock('http://server').get('/some.json').reply(200, '{"foo": "bar"}', {
      'content-type': 'application/json'
    })
  })

  it('should add cheerio to html responses', () => {
    return agent.get('http://server/some.html').then(res => {
      expect(res.$).toBeDefined()
      expect(res.$).not.toBeNull()
      expect(res.$).toBeInstanceOf(Function)
      expect(res.$('title')).toBeInstanceOf(cheerio)
      expect(res.$('title').text()).toBe('foo')
      expect(res.$('body').text()).toBe('bar')
    })
  })

  it('should not add cheerio to other responses', () => {
    return agent.get('http://server/some.json').then(res => {
      expect(res.$).toBeUndefined()
    })
  })
})
