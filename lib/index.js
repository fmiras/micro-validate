const { createError } = require('micro')

module.exports = (parameters, validator) => {
  if (!validator) {
    validator = p => p
  }

  const paramNames = Object.keys(parameters)
  paramNames.forEach(n => {
    if (!validator(parameters[n])) {
      throw createError(409, `The parameter ${n} is missing`)
    }
  })
}
