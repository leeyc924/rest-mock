export interface ISignUpArg {
  accountEmail: string;
  accountPw: string;
  accountNm: string;
}

export interface ILoginArg {
  accountEmail: string;
  accountPw: string;
  loginType: string;
}