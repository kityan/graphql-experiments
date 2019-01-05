const
  graphql = require('graphql'),
  { Kind } = require('graphql/language')


const validators = {

  // validator for OddInteger custom scalar type
  OddInteger(value) {
    if (value == null || !isFinite(value)) {
      throw new TypeError(`Value is not a number: ${value}`);
    }
    const v = parseInt(value)
    if (value != v) {
      throw new TypeError(`Value is not an integer: ${value}`);
    }
    if (v % 2 === 0) {
      throw new TypeError(`Value is not an odd integer: ${value}`);
    }
    return v
  }

}

const OddInteger = new graphql.GraphQLScalarType({
  name: 'OddInteger',
  description: 'OddInteger custom scalar type',
  serialize(value) { return validators.OddInteger(value) },
  parseValue(value) { return validators.OddInteger(value) },
  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new graphql.GraphQLError(`Can only validate integers as odd integers but got a: ${ast.kind}`);
    }
    return validators.OddInteger(ast.value)
  },
})

module.exports = {
  OddInteger
}
