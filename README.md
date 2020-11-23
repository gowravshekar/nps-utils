# This repository has been forked from [nps-utils][nps-utils-orig]

# nps-utils

Utilities for [nps][nps] (npm-package-scripts)

[![version][version-badge]][package]


## The problem

[nps][nps] is a great package to empower your scripts and there are some common
things you wind up doing to keep your `package-scripts.js` file clean, useful,
and maintainable. So you wind up duplicating utility functions across projects.

## This solution

This has several utility functions you'll often want when using `nps`.


## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install nps-utils
```

## Usage

You'll most likely use this in your `package-scripts.js` file:

```javascript
const npsUtils = require('nps-utils')

module.exports = {
  scripts: {
    validate: npsUtils.concurrentNPS('lint', 'build', 'test --coverage'),
    lint: 'eslint .',
    build: 'webpack --env.production',
    test: 'jest'
  }
}
```

### Available methods:

### Series Commands
```javascript
const npsUtils = require('nps-utils')

module.exports = {
  scripts: {
    validate: npsUtils.series('nps build', 'nps lint', 'nps test'),
    lint: 'eslint .',
    build: 'webpack --env.production',
    test: 'jest'
  }
}
```

### Rimraf Commands
```javascript
const npsUtils = require('nps-utils')

module.exports = {
  scripts: {
    clean: npsUtils.rimraf('build'),
  }
}
```

### Copy Commands
```javascript
const npsUtils = require('nps-utils')

module.exports = {
  scripts: {
    copy: npsUtils.copy('dist', 'build'),
  }
}
```

### Cross-Env Commands
```javascript
const npsUtils = require('nps-utils')

module.exports = {
  scripts: {
    copy: npsUtils.crossEnv('NODE_ENV=production nps build'),
    build: 'webpack --env.production'
  }
}
```

### isDocker Commands
```javascript
const npsUtils = require('nps-utils')

module.exports = {
  scripts: {
    copy: npsUtils.isDocker() ? 'nps watchInsideDocker' : 'nps watch',
    watchInsideDocker: 'webpack --env.production',
    watch: 'webpack --env.production'
  }
}
```

### Concurrently Commands - Experimental
```javascript
const npsUtils = require('nps-utils')

module.exports = {
  scripts: {
    validate: npsUtils.concurrentNPS('build', 'lint', 'test'),
    lint: 'eslint .',
    build: 'webpack --env.production',
    test: 'jest'
  }
}
```

## LICENSE

MIT

[version-badge]: https://badge.fury.io/js/%40austonpramodh%2Fnps-utils.svg
[nps]: https://npmjs.com/package/nps
[nps-utils-orig]: https://github.com/kentcdodds/nps-utils#readme
[package]: https://www.npmjs.com/package/@austonpramodh/nps-utils