const test = require('ava')
const rewire = require('rewire')

const validate = rewire('../lib')
validate.__set__('createError', (code, message) => {
  throw new Error(message)
})

test('validate 2 normal string parameters', t => {
  const parameters = { param1: 'value1', param2: 'value2' }
  const thrower = () => validate(parameters)
  t.notThrows(thrower)
})

test('validate an empty parameter', t => {
  const param1 = undefined
  const parameters = { param1, param2: 'value2' }
  const thrower = () => validate(parameters)
  t.throws(thrower)
})

test('custom validator pass', t => {
  const parameters = { ssn: 12345678 }
  const validator = p => {
    return Number.isInteger(p)
  }
  const thrower = () => validate(parameters, validator)
  t.notThrows(thrower)
})

test('custom validator fail', t => {
  const parameters = { ssn: '12345678' }
  const validator = p => {
    return Number.isInteger(p)
  }
  const thrower = () => validate(parameters, validator)
  t.throws(thrower)
})
