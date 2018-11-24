superagent-cheerio is a small plugin that connects together [SuperAgent](https://www.npmjs.com/package/superagent) and [cheerio](https://www.npmjs.com/package/cheerio).

It came from using [SuperTest](https://www.npmjs.com/package/supertest) for testing, and wanting easy access to cheerio for testing html responses.

## Installation

SuperAgent and cheerio are peer dependencies, you need to add them yourself.

```
$ npm install superagent cheerio superagent-cheerio
```

## Usage for a single request

```js
const request = require('superagent')
const superagentCheerio = require('superagent-cheerio')
const res = await request
  .get('/foo')
  .use(supertestCheerio)

res.$('h1').text()
```

## Usage for lots of requests

```js
const request = require('superagent')
const superagentCheerio = require('superagent-cheerio')
const agent = request.agent().use(superagentCheerio)
const res = await agent.get('/foo')

res.$('h1').text()
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