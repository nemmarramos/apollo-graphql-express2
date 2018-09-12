'use strict';

import { ApolloServer } from 'apollo-server-express';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import jwt from 'jsonwebtoken';

import { host, port, appSecret } from 'config/env';
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
      const getCookie = (name) => {
        const match = req.headers.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
      };

      const jwtToken = getCookie('jwt');

      console.log('jwtToken', jwtToken)
      const decoded = jwt.verify(jwtToken, appSecret);
      console.log('decoded', decoded);

    } catch(err) {
      console.error(err);
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