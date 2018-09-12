'use strict';

import { ApolloServer } from 'apollo-server-express';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import jwt from 'jsonwebtoken';

import { host, port } from 'config/env';
import usersType from './users/types';
import usersResolvers from './users/resolvers';

const typeDefs = mergeTypes([usersType]);
const resolvers = mergeResolvers([usersResolvers]);

// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  playground: {
    endpoint: `http://${host}:${port}/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  },
  context: ({ req, res }) => {
    try {
      console.log('req.headers.cookie', req.headers.cookie)
      const decoded = jwt.verify(req.headers.cookie, env.appSecret);
      console.log('decoded', decoded);

    } catch(err) {
      // err
    }

    return {
      res,
    }
  },
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