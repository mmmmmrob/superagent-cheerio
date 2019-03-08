'use strict'

const request = require('superagent')
const cheerio = require('cheerio')
const supertestCheerio = require('../lib/index.js')
const nock = require('nock')

describe('superagent-cheerio', () => {
  beforeAll(() => {
    nock('http://server')
      .get('/some.xml')
      .times(3)
      .reply(200, '<xml><foo>foo</foo><bar>bar</bar></xml>', {
        'content-type': 'text/xml'
      })
    nock('http://another-server')
      .get('/some.xml')
      .reply(200, '<xml><foo>foo</foo><bar>bar</bar></xml>', {
        'content-type': 'text/xml; charset=ISO-8859-1'
      })
    nock('http://server').get('/some.json').reply(200, '{"foo": "bar"}', {
      'content-type': 'application/json'
    })
  })

  it('should not add cheerio to xml responses by default', () => {
    return request('http://server/some.xml').then(res => {
      expect(res.$).toBeUndefined()
    })
  })

  it('should add cheerio to xml responses when asked to', () => {
    return request('http://server/some.xml')
      .use(supertestCheerio())
      .then(res => {
        expect(res.$).toBeDefined()
        expect(res.$).not.toBeNull()
        expect(res.$).toBeInstanceOf(Function)
        expect(res.$('foo')).toBeInstanceOf(cheerio)
        expect(res.$('foo').text()).toBe('foo')
        expect(res.$('bar').text()).toBe('bar')
      })
  })

  it('should add cheerio to xml (and charset) responses when asked to', () => {
    return request('http://another-server/some.xml')
      .use(supertestCheerio())
      .then(res => {
        expect(res.$).toBeDefined()
        expect(res.$).not.toBeNull()
        expect(res.$).toBeInstanceOf(Function)
        expect(res.$('foo')).toBeInstanceOf(cheerio)
        expect(res.$('foo').text()).toBe('foo')
        expect(res.$('bar').text()).toBe('bar')
      })
  })

  it('should not add cheerio to other responses', () => {
    return request('http://server/some.json')
      .use(supertestCheerio())
      .then(res => {
        expect(res.$).toBeUndefined()
      })
  })

  it('should not have made cheerio the default', () => {
    return request('http://server/some.xml').then(res => {
      expect(res.$).toBeUndefined()
    })
  })
})
