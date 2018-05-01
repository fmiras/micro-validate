const { createError } = require('micro')

module.exports = parameters => {
  const paramNames = Object.keys(parameters)
  paramNames.forEach(n => {
    if (!parameters[n]) {
      throw createError(409, `The parameter ${n} is missing`)
    }
  })
}
