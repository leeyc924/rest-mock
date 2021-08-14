import { buildSchema } from 'graphql';

import { AccountMutation, AccountType, accountResolver } from './account/index';

export const schema = buildSchema(`
  ${AccountType}

  type RootQuery {
   find: [Account]
  }

  type RootMutation {
    ${AccountMutation}
  }

  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`);

export const rootValue = {
  ...accountResolver
};