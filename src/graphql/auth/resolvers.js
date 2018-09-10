export default {
  Mutation: {
    login: (_, { email, password }) => {
      console.log('email', email);
      console.log('password', password);
    }
  }
}