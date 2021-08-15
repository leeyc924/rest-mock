import { ILoginArg, ISignUpArg } from "./model";
import { login, signUp } from "./resolver";

export const AuthType = `
  type ReturnSignUpType {
    accessToken: String
  }

  type ReturnLoginType {
    accessToken: String
    loginInfo: Account
  }
`;

export const AuthMutation = `
  signUp(accountEmail: String! accountPw: String! accountNm: String!): ReturnSignUpType
  login(accountEmail: String! accountPw: String!): ReturnLoginType
`;

export const authResolver = {
  signUp,
  login,
}