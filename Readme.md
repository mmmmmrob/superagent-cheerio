superagent-cheerio is a small library that plugs together [SuperAgent](https://www.npmjs.com/package/superagent) and [cheerio](https://www.npmjs.com/package/cheerio).

It comes from using [SuperTest](https://www.npmjs.com/package/supertest) for testing, and wanting easy access to cheerio for testing html responses.

## Installation

```
$ npm install superagent-cheerio
```

```js
const request
const res = await request
  .post('/api/pet')
  .send({ name: 'Manny', species: 'cat' }) // sends a JSON post body
  .set('X-API-Key', 'foobar')
  .set('accept', 'json');
```


## Plugins

SuperAgent is easily extended via plugins.

```js
const nocache = require('superagent-no-cache');
const request = require('superagent');
const prefix = require('superagent-prefix')('/static');

request
  .get('/some-url')
  .query({ action: 'edit', city: 'London' }) // query string
  .use(prefix) // Prefixes *only* this request
  .use(nocache) // Prevents caching of *only* this request
  .end((err, res) => {
    // Do something
  });
```

Please prefix your plugin with `superagent-*` so that it can easily be found by others.

## Running node tests

Install dependencies:

```shell
$ npm install
```
Run tests

```shell
$ npm test
```

## License

MIT