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
    nock('http://server').get('/some.json').reply(200, '{"foo": "bar"}', {
      'content-type': 'application/json'
    })
  })

  it('should not add cheerio to html responses by default', () => {
    return request('http://server/some.html').then(res => {
      expect(res.body).toEqual({})
    })
  })

  it('should add cheerio to html responses when asked to', () => {
    return request('http://server/some.html')
      .then(supertestCheerio)
      .then(res => {
        expect(res.body).toBeDefined()
        expect(res.body).not.toBeNull()
        expect(res.body).toBeInstanceOf(Function)
        expect(res.body('title')).toBeInstanceOf(cheerio)
        expect(res.body('title').text()).toBe('foo')
        expect(res.body('body').text()).toBe('bar')
      })
  })

  it('should not add cheerio to other responses', () => {
    return request('http://server/some.json')
      .then(supertestCheerio)
      .then(res => {
        expect(res.body).not.toBeInstanceOf(Function)
        expect(res.body).toEqual({ foo: 'bar' })
      })
  })

  it('should not have made cheerio the default', () => {
    return request('http://server/some.html').then(res => {
      expect(res.body).toEqual({})
    })
  })
})
