'use strict'

const superagent = require('superagent')
const cheerio = require('cheerio')

function addHtmlParserToSuperAgent (request) {
  request.parse['text/html'] = function (res, cb) {
    res.text = ''
    res.on('data', chunk => (res.text += chunk))
    res.on('end', () => {
      try {
        var body = res.text && cheerio.load(res.text)
      } catch (e) {
        var err = e
        err.rawResponse = res.text || null
        err.statusCode = res.statusCode
      } finally {
        cb(err, body)
      }
    })
  }
}

module.exports = arg => {
  if (
    arg instanceof superagent.Response &&
    arg.text &&
    arg.header['content-type'] === 'text/html'
  ) {
    arg.body = cheerio.load(arg.text)
  } else if (arg.parse) {
    addHtmlParserToSuperAgent(arg)
  }
  return arg
}
