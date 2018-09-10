'use strict';

import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import authType from './auth/types';
import authResolvers from './auth/resolvers';

const typeDefs = mergeTypes([authType]);
const resolvers = mergeResolvers([authResolvers]);

// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
});
// Exports
export default SERVER;