import { buildSchema } from 'graphql';

export default buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    updated: String
    created: String
    bio: String
  }

  input UserInputData {
    email: String!
    name: String!
    password: String!
  }

  type RootQuery {
    hello: String
  }

  type RootMutation {
    createUser(userInput: UserInputData): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
