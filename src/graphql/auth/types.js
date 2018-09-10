export default `
  type User {
    id: ID!
    username: String
    email: String
  }
  type Query {
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Boolean
  }
`