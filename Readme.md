superagent-cheerio is a small plugin that connects together [SuperAgent](https://www.npmjs.com/package/superagent) and [cheerio](https://www.npmjs.com/package/cheerio).

It came from using [SuperTest](https://www.npmjs.com/package/supertest) for testing, and wanting easy access to cheerio for testing html/xml responses.

## Installation

SuperAgent and cheerio are peer dependencies, you need to add them yourself.

```
$ npm install superagent cheerio superagent-cheerio
```

## Usage for a single request

```js
const request = require('superagent')
const superagentCheerio = require('superagent-cheerio')
const res = await request.get('https://www.google.co.uk').use(superagentCheerio())
console.log(res.$('h1').text())

// or promises

request.get('https://www.google.co.uk')
  .use(superagentCheerio())
  .then(res => {
    console.log(res.$('h1').text())
  })

```

## Usage for lots of requests

```js
const request = require('superagent')
const superagentCheerio = require('superagent-cheerio')
const agent = request.agent().use(superagentCheerio())
const res = await agent.get('https://www.google.co.uk')
console.log(res.$('h1').text())

// or promises

agent.get('https://www.google.co.uk').then(res => {
    console.log(res.$('h1').text())
})

```

## Usage with cheerio load method options

```js
const request = require('superagent')
const superagentCheerio = require('superagent-cheerio')
const res = await request.get('https://www.google.co.uk').use(superagentCheerio({ xmlMode: true }))
console.log(res.$('h1').text())

// or promises

request.get('https://www.google.co.uk')
  .use(superagentCheerio({ xmlMode: true }))
  .then(res => {
    console.log(res.$('h1').text())
  })

```

## Running tests

Install dependencies:

```shell
$ npm install
```
Run tests:

```shell
$ npm test
```

## License

MIT