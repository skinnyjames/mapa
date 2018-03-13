# babel-load-config

[![NPM version](https://img.shields.io/npm/v/babel-load-config.svg?style=flat)](https://npmjs.com/package/babel-load-config) [![NPM downloads](https://img.shields.io/npm/dm/babel-load-config.svg?style=flat)](https://npmjs.com/package/babel-load-config) [![Build Status](https://img.shields.io/circleci/project/egoist/babel-load-config/master.svg?style=flat)](https://circleci.com/gh/egoist/babel-load-config) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Install

```bash
# this requires babel-core as peer dependency
yarn add babel-load-config babel-core
```

## Usage

```js
const loadConfig = require('babel-load-config')
const buildConfigChain = require('babel-core/lib/transformation/file/options/build-config-chain')

const config = loadConfig(process.cwd(), buildConfigChain)
//=> {loc: '/User/name/dir/.babelrc', options: {presets: []}}
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**babel-load-config** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/babel-load-config/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
