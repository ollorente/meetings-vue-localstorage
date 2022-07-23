// @ts-check
const { gql } = require('apollo-server-lambda')

const typeDefinations = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type DateTime {
    _: String
  }
  input Options {
    limit: Int
    page: Int
  }
`
exports.rootTypeDefs = [
  typeDefinations
]

exports.rootResolvers = []