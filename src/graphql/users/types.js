export default `
  type Auth {
    token: String
    refreshToken: String
  }

  type User {
    id: ID!
    username: String
    email: String
  }
  type Query {
    users: [User]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    logout: Boolean
    register(username: String!, password: String!, email: String!, firstname: String!, middlename: String, lastname: String!, contactNumber: String!, birthdate: String!, civilStatusId: Int, prcLicense: String, educationalAttainmentId: Int, school: String, yearsInTeaching: Int, designation: String): Boolean
  }
`