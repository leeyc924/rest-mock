import { buildSchema } from 'graphql';

import { AccountType, accountResolver } from './account/index';

export const schema = buildSchema(`
  ${AccountType}

  type RootQuery {
   find: [Account]
  }


  schema {
    query: RootQuery,
  }
`);

export const rootValue = {
  ...accountResolver
};