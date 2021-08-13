import { buildSchema } from 'graphql';

import { signUp } from './account/mutation';

export const schema = buildSchema(`
type Query {
  find: [Account]
}
  type Mutation {
    signUp(accountEmail: String!, accountPw: String!): [AccountToken]
  }

  type AccountToken {
    accountToken: String,
  }
  type Account{
    accountId: String,
    accountEmail: String,
    accountPw: String,
    placeId: String,
    viewPlaceId: String,
    accountType: String,
    lastLoginDt: String,
    pwChangeDt: String,
    imagePath: String,
    imageSize: String,
    useYn: String,
    delYn: String,
    delDt: String,
    regDt: String,
    modDt: String
  }
`);

export const root = {
  signUp: async (args, context, info) => {
    return await signUp(args);
  }
};