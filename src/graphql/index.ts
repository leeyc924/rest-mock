import { buildSchema } from 'graphql';

import { AuthMutation, AuthType, authResolver } from './auth/index';

import SchemaType from './schema';

export const schema = buildSchema(`
  ${SchemaType}

  ${AuthType}

  type RootQuery {
   find: [Account]
  }

  type RootMutation {
    ${AuthMutation}
  }

  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`);

export const rootValue = {
  ...authResolver
};