# random-latitude

> Generate a random latitude.


[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/mock-end/random-latitude/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/mock-end/random-latitude/master.svg?style=flat-square)](https://travis-ci.org/mock-end/random-latitude)
[![coverage:?](https://img.shields.io/coveralls/mock-end/random-latitude/master.svg?style=flat-square)](https://coveralls.io/github/mock-end/random-latitude)


## Install

```
$ npm install --save random-latitude 
```

## Usage

```js
var randomLatitude = require('random-latitude');

// API
// - randomLatitude();
// - randomLatitude(options);

// options:
// - min  : default -90
// - max  : default 90
// - fixed: default 5

randomLatitude();
// => 57.99514
```
By default includes 5 fixed digits after decimal, can specify otherwise.

```js
randomLatitude({ fixed: 7 })
// => -29.6443133
```
By default includes entire range of allowed longitudes, can specify a min and/or max to bound it:

```js
randomLatitude({min: 38.7, max: 38.9});
// => -38.82358
```

## Related

- [random-coordinates](https://github.com/mock-end/random-coordinates) - Generate a random coordinates, which are latitude and longitude, comma separated.
- [random-longitude](https://github.com/mock-end/random-longitude) - Generate a random longitude.
- [random-altitude](https://github.com/mock-end/random-altitude) - Generate a random altitude, in meters.
- [random-depth](https://github.com/mock-end/random-depth) - Generate a random depth, in meters. Depths are always negative.
- [random-geohash](https://github.com/mock-end/random-geohash) - Generate a random geohash.
- [random-geojson](https://github.com/mock-end/random-geojson) - Generate a random geojson.
- [random-country](https://github.com/mock-end/random-country) - Return a random country. 
- [random-lang](https://github.com/mock-end/random-lang) - Return a random language name.


## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/mock-end/random-latitude/issues/new).
