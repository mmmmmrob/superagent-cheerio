'use strict'

const cheerio = require('cheerio')

module.exports = request => {
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
