const express = require('express')
const serverless = require('serverless-http')
const { ApolloServer } = require('apollo-server-express')

const app = express()
const db = require('./db')

const { resolvers } = require('./Schema/Resolvers')
const { typeDefs } = require('./Schema/TypeDefs')

const server = new ApolloServer({ typeDefs, resolvers, context: { db } })

await server.start()
server.applyMiddleware({ app })

app.use('/.netlify/functions/user', server)

exports.handler = serverless(app)