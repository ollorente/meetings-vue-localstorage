const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
	type Query {
		users: [User!]!
		user(id: ID!): User
	}

	type Mutation {
		userCreate(input: AddUserInput): User
		userUpdate(id: ID!, input: UpdateUserInput): User
		userRemove(id: ID!): Boolean
	}

	type User {
		id: ID!
		name: String!
	}

	input AddUserInput {
		name: String!
	}

	input UpdateUserInput {
		name: String
	}
`