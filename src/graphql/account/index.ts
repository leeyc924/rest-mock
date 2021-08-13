import { GraphQLObjectType, GraphQLString } from "graphql";

import { find } from './query';
import { signUp } from './mutation';

export const accountType = new GraphQLObjectType({
  name: 'account',
  fields: () => ({
    accountId: { type: GraphQLString },
    accountEmail: { type: GraphQLString },
    accountPw: { type: GraphQLString },
    placeId: { type: GraphQLString },
    viewPlaceId: { type: GraphQLString },
    accountType: { type: GraphQLString },
    lastLoginDt: { type: GraphQLString },
    pwChangeDt: { type: GraphQLString },
    imagePath: { type: GraphQLString },
    imageSize: { type: GraphQLString },
    useYn: { type: GraphQLString },
    delYn: { type: GraphQLString },
    delDt: { type: GraphQLString },
    regDt: { type: GraphQLString },
    modDt: { type: GraphQLString },
  })
});

export const accountQuery = {
  find,
}

export const accountMutation = {
  signUp
}