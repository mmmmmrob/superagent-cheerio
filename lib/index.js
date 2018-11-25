'use strict'

const superagent = require('superagent')
const cheerio = require('cheerio')

module.exports = req => {
  req.on('response', res => {
    if (/^text\/html(?:;.*)?/.test(res.header['content-type'])) {
      res.$ = cheerio.load(res.text)
    }
  })
}
