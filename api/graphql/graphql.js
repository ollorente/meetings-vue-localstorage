// @ts-check
require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-lambda')
const {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer
  // @ts-ignore
} = require('apollo-server-core')
const http = require('http')

const { rootTypeDefs, rootResolvers } = require('./schema')
require('./database')

const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer({
  typeDefs: rootTypeDefs,
  resolvers: rootResolvers,
  context: ({ event, context, express }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    expressRequest: express.req
  }),
  plugins: [
    // @ts-ignore
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
    // @ts-ignore
    ApolloServerPluginDrainHttpServer({ httpServer })
  ]
})

// @ts-ignore
const serverHandler = server.createHandler({ app })

exports.handler = (event, context, callback) => {
  return serverHandler(
    {
      ...event,
      requestContext: event.requestContext || {}
    },
    context,
    callback
  )
}