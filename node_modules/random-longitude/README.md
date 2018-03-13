
# random-longitude

> Generate a random longitude.

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/mock-end/random-longitude/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/mock-end/random-longitude/master.svg?style=flat-square)](https://travis-ci.org/mock-end/random-longitude)
[![coverage:?](https://img.shields.io/coveralls/mock-end/random-longitude/master.svg?style=flat-square)](https://coveralls.io/github/mock-end/random-longitude)


## Install

```
$ npm install --save random-longitude 
```

## Usage

```js
var randomLongitude = require('random-longitude');

// API
// - randomLongitude();
// - randomLongitude(options);

// options:
// - min  : default -180
// - max  : default 180
// - fixed: default 5

randomLongitude();
// => 149.41549
```

By default, includes 5 digits of accuracy after the decimal. Can override with the `fixed` option.

```js
randomLongitude({ fixed: 7 })
// => 51.4549925
```
By default includes entire range of allowed longitudes, can specify a min and/or max to bound it:

```js
randomLongitude({min: -78, max: -77});
// => -77.22644
```

## Related

- [random-latitude](https://github.com/mock-end/random-latitude) - Generate a random latitude.
- [random-coordinates](https://github.com/mock-end/random-coordinates) - Generate a random coordinates, which are latitude and longitude, comma separated.
- [random-altitude](https://github.com/mock-end/random-altitude) - Generate a random altitude, in meters.
- [random-depth](https://github.com/mock-end/random-depth) - Generate a random depth, in meters. Depths are always negative.
- [random-geohash](https://github.com/mock-end/random-geohash) - Generate a random geohash.
- [random-geojson](https://github.com/mock-end/random-geojson) - Generate a random geojson.
- [random-country](https://github.com/mock-end/random-country) - Return a random country. 
- [random-lang](https://github.com/mock-end/random-lang) - Return a random language name.

## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/mock-end/random-longitude/issues/new).
  
  
