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

  // DataLoader loaders generator
  createDataLoaders = require('./modules/graphql/createDataLoaders'),

  _dataLoadersRef = { // reference to update on each request
    loaders: createDataLoaders()
  },

  // resolvers
  resolvers = require('./modules/graphql/resolvers')(_dataLoadersRef),

  // schema
  schema = makeExecutableSchema({
    typeDefs: require('fs').readFileSync('./modules/graphql/schema.gql').toString(),
    resolvers: { ...resolvers, OddInteger, DateTime }
  })

app
  .use('/api', (res, req, next) => {
    // recreate DataLoader loaders
    _dataLoadersRef.loaders = createDataLoaders()
    next()
  })
  .use('/api', expressGraphql(req => ({ context: { h: req.headers }, schema, graphiql: true })))
  .listen(3000)
