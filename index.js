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

  // resolvers
  resolvers = require('./modules/graphql/resolvers'),

  // schema
  schema = makeExecutableSchema({
    typeDefs: require('fs').readFileSync('./modules/graphql/schema.gql').toString(),
    resolvers: { ...resolvers, OddInteger, DateTime }
  })

app
  .use('/api', (res, req, next) => {
    next()
  })
  .use('/api', expressGraphql(req => {
    // DataLoader doesn't allow to pass additional arguments, therefore:
    // `context` passed to loaders (dbManager need data about authentication etc.)
    // loaders themselves are passed with context to resolvers, to be brand new on each request
    const context = { req }
    // per-request loaders
    context.loaders = createDataLoaders(context)
    return { context, schema, graphiql: true }
  }))
  .listen(3000)
