'use strict'

const request = require('superagent')
const cheerio = require('cheerio')
const supertestCheerio = require('../lib/index.js')
supertestCheerio(request)
const nock = require('nock')

describe('superagent-cheerio', () => {
  it('should add cheerio to html responses', () => {
    nock('http://server')
      .get('/some.html')
      .reply(200, '<html><title>foo</title><body>bar</body></html>', {
        'content-type': 'text/html'
      })
    return request('http://server/some.html').then(res => {
      expect(res.body).toBeDefined()
      expect(res.body).not.toBeNull()
      expect(res.body).toBeInstanceOf(Function)
      expect(res.body('title')).toBeInstanceOf(cheerio)
      expect(res.body('title').text()).toBe('foo')
      expect(res.body('body').text()).toBe('bar')
    })
  })

  it('should not add cheerio to other responses', () => {
    nock('http://server').get('/some.json').reply(200, '{}', {
      'content-type': 'application/json'
    })
    return request('http://server/some.json').then(res => {
      expect(res.body).not.toBeInstanceOf(Function)
    })
  })
})
