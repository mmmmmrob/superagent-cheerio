'use strict'

const superagent = require('superagent')
const cheerio = require('cheerio')

module.exports = (options = {}) => req => {
  req.on('response', res => {
    if (/^text\/(html|xml)(?:;.*)?/.test(res.header['content-type'])) {
      res.$ = cheerio.load(res.text, options)
    }
  })
}
