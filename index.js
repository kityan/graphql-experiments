const
  express = require('express'),
  expressGraphql = require('express-graphql'),
  // graphql = require('graphql'),
  { makeExecutableSchema } = require('graphql-tools'),

  // custom scalars type from package @okgrow/graphql-scalars
  { DateTime } = require('@okgrow/graphql-scalars'),

  // our custom scalar type resolvers
  { OddInteger } = require('./modules/graphql/customScalars'),

  app = express(),

  // rootValue resolvers
  rootValue = require('./modules/graphql/rootValue'),

  // schema
  // [?] we can't use `graphql.buildSchema()` because we need to add custom scalar types with resolvers
  schema = makeExecutableSchema({
    typeDefs: require('fs').readFileSync('./modules/graphql/schema.gql').toString(),
    resolvers: { OddInteger, DateTime }
  })

app
  .use('/api', expressGraphql({ schema, rootValue, graphiql: true }))
  .listen(3000)
