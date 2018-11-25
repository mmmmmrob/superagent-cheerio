'use strict'

const request = require('superagent')
const cheerio = require('cheerio')
const supertestCheerio = require('../lib/index.js')
const nock = require('nock')

describe('superagent-cheerio', () => {
  beforeAll(() => {
    nock('http://server')
      .get('/some.html')
      .times(3)
      .reply(200, '<html><title>foo</title><body>bar</body></html>', {
        'content-type': 'text/html'
      })
    nock('http://another-server')
      .get('/some.html')
      .reply(200, '<html><title>foo</title><body>bar</body></html>', {
        'content-type': 'text/html; charset=ISO-8859-1'
      })
    nock('http://server').get('/some.json').reply(200, '{"foo": "bar"}', {
      'content-type': 'application/json'
    })
  })

  it('should not add cheerio to html responses by default', () => {
    return request('http://server/some.html').then(res => {
      expect(res.$).toBeUndefined()
    })
  })

  it('should add cheerio to html responses when asked to', () => {
    return request('http://server/some.html')
      .use(supertestCheerio)
      .then(res => {
        expect(res.$).toBeDefined()
        expect(res.$).not.toBeNull()
        expect(res.$).toBeInstanceOf(Function)
        expect(res.$('title')).toBeInstanceOf(cheerio)
        expect(res.$('title').text()).toBe('foo')
        expect(res.$('body').text()).toBe('bar')
      })
  })

  it('should add cheerio to html (and charset) responses when asked to', () => {
    return request('http://another-server/some.html')
      .use(supertestCheerio)
      .then(res => {
        expect(res.$).toBeDefined()
        expect(res.$).not.toBeNull()
        expect(res.$).toBeInstanceOf(Function)
        expect(res.$('title')).toBeInstanceOf(cheerio)
        expect(res.$('title').text()).toBe('foo')
        expect(res.$('body').text()).toBe('bar')
      })
  })

  it('should not add cheerio to other responses', () => {
    return request('http://server/some.json')
      .use(supertestCheerio)
      .then(res => {
        expect(res.$).toBeUndefined()
      })
  })

  it('should not have made cheerio the default', () => {
    return request('http://server/some.html').then(res => {
      expect(res.$).toBeUndefined()
    })
  })
})
