# micro-validate
[![NPM version](https://img.shields.io/npm/v/micro-validate.svg)](https://www.npmjs.com/package/micro-validate)
[![Build Status](https://travis-ci.org/fmiras/micro-validate.svg?branch=master)](https://travis-ci.org/fmiras/micro-validate)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/micro)
[![Greenkeeper badge](https://badges.greenkeeper.io/fmiras/micro-validate.svg)](https://greenkeeper.io/)

micro-validate is an utility that is being used to validate parameters, it uses the `createError` function of [micro](https://github.com/zeit/micro) to throw (or return) an 409 HTTP error to the request made to the microservice.

## Usage

```bash
cd my-micro-project/
npm install --save micro-validate
```

and add use the package like this:

```javascript
const { parse } = require('url')
const validate = require('micro-validate')

module.exports = (req, res) => {
  const { user, country } = parse(req.url, true).query
  validate({ user, country })
  return 'all ok!'
}
```

then you can just try the microservice validation by doing some request, here are some examples:

`http://localhost:3000?user=fmiras&country=argentina` => HTTP 200 'all ok!'

`http://localhost:3000?user=someuser` => HTTP 409 'The country parameter is missing'

The package just validates if the parameter is defined or not, but you can also setup your custom validator and you can also use a custom message (if not, it will keep using the same):

```javascript
const { parse } = require('url')
const validate = require('micro-validate')

const validator = p => Number.isInteger(p)

module.exports = (req, res) => {
  const { zip_code } = parse(req.url, true).query
  validate({ zip_code }, validator, 'The parameter {param} is wrong')
  return 'all ok!'
}
```

`http://localhost:3000?zip_code=1416` => HTTP 200 'all ok!'

`http://localhost:3000` => HTTP 409 'The zip_code parameter is missing'

`http://localhost:3000?zip_code=hello` => HTTP 409 'The parameter zip_code is wrong'

You can, of course, chain validations to set different criterion of each param:


```javascript
const { parse } = require('url')
const validate = require('micro-validate')

const numberValidator = p => Number.isInteger(p)
const passportValidator = p => p.length === 8

module.exports = (req, res) => {
  const { zip_code, passport_id, message, name, from, to } = parse(req.url, true).query
  validate({ zip_code }, numberValidator, 'The parameter {param} must be a number')
  validate({ passport_id }, passportValidator, 'The parameter {param} must be 8 characters-length')
  validate({ message, name, from, to })
  // Use all the parameters!
  return 'all ok!'
}
```

## Why?

By making some validations you can get several if/switch-repeats, or you may need to program a polymorphic function to not get error at the time you use the parameters. With this package you save the time of doing that letting you just focus on the business logic of the microservice.

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of micro-cacheable, just link it to the dependencies: `npm link micro-validate`. Instead of the default one from npm, node will now use your clone of micro-validate!

## Credits

Thanks to [ZEIT](https://zeit.co) Team for giving us [micro](https://github.com/zeit/micro) to make our life easier!
