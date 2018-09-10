'use strict';

import { ApolloServer } from 'apollo-server-express';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import usersType from './users/types';
import usersResolvers from './users/resolvers';

const typeDefs = mergeTypes([usersType]);
const resolvers = mergeResolvers([usersResolvers]);

// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  },
  context: ({ res }) => ({
    res
  }),
  formatError(err) {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
      errors.report(err, req);   // <-- log the error
    }
    return {
      message: err.message,
      code: err.originalError && err.originalError.code,   // <--
      locations: err.locations,
      path: err.path
    };
  }
});
// Exports
export default SERVER;