'use strict'

const superagent = require('superagent')
const cheerio = require('cheerio')

module.exports = req => {
  req.on('response', res => {
    if (res.header['content-type'] === 'text/html') {
      res.$ = cheerio.load(res.text)
    }
  })
}
