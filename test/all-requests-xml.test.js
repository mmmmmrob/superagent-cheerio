'use strict'

const supertestCheerio = require('../lib/index.js')
const request = require('superagent')
const agent = request.agent().use(supertestCheerio({ xmlMode: true }))
const cheerio = require('cheerio')
const nock = require('nock')

describe('superagent-cheerio', () => {
  beforeAll(() => {
    nock('http://server')
      .get('/some.xml')
      .reply(200, '<xml><foo>foo</foo><bar>bar</bar></xml>', {
        'content-type': 'text/xml'
      })
    nock('http://another-server')
      .get('/some.xml')
      .reply(200, '<xml><foo>foo</foo><bar>bar</bar></xml>', {
        'content-type': 'text/xml; charset=utf-8'
      })
    nock('http://server').get('/some.json').reply(200, '{"foo": "bar"}', {
      'content-type': 'application/json'
    })
  })

  it('should add cheerio to xml responses', () => {
    return agent.get('http://server/some.xml').then(res => {
      expect(res.$).toBeDefined()
      expect(res.$).not.toBeNull()
      expect(res.$).toBeInstanceOf(Function)
      expect(res.$('foo')).toBeInstanceOf(cheerio)
      expect(res.$('foo').text()).toBe('foo')
      expect(res.$('bar').text()).toBe('bar')
    })
  })

  it('should add cheerio to xml (and charset) responses', () => {
    return agent.get('http://another-server/some.xml').then(res => {
      expect(res.$).toBeDefined()
      expect(res.$).not.toBeNull()
      expect(res.$).toBeInstanceOf(Function)
      expect(res.$('foo')).toBeInstanceOf(cheerio)
      expect(res.$('foo').text()).toBe('foo')
      expect(res.$('bar').text()).toBe('bar')
    })
  })

  it('should not add cheerio to other responses', () => {
    return agent.get('http://server/some.json').then(res => {
      expect(res.$).toBeUndefined()
    })
  })
})
