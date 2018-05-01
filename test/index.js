const test = require('ava')
const rewire = require('rewire')

const validate = rewire('../lib')
validate.__set__('createError', (code, message) => { throw new Error(message) })

test('validate 2 normal string parameters', t => {
  const parameters = { param1: 'value1', param2: 'value2' }
  const thrower = () => validate(parameters)
  t.notThrows(thrower)
})
