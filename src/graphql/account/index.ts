import { signUp } from "./resolver";

export const AccountType = `
  type Account {
    accountId: String
    accountEmail: String
    accountPw: String
    placeId: String
    viewPlaceId: String
    accountType: String
    lastLoginDt: String
    pwChangeDt: String
    imagePath: String
    imageSize: String
    useYn: String
    delYn: String
    delDt: String
    regDt: String
    modDt: String
  }

  type ReturnSignUpType {
    accessToken: String
  }
`;

export const AccountMutation = `
  signUp(accountEmail: String! accountPw: String!): ReturnSignUpType
`;

export const accountResolver = {
  signUp: async (args, context, info) => {
    return await signUp(args);
  }
}