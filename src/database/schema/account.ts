import { model, Schema } from 'mongoose';

export interface IAccountSchema {
  accountId: string,
  accountPw: string,
  accountNm: string,
  lastLoginDt: string,
  pwChangeDt: string,
  useYn: 'Y' | 'N',
  modDt: string,
  regDt: string,
  delYn: 'Y' | 'N',
  delDt: string,
  permission: 'USER' | 'ADMIN',
}

const AccountSchema = new Schema({
  accountId: String,
  accountPw: String,
  accountNm: String,
  lastLoginDt: String,
  pwChangeDt: String,
  useYn: String,
  modDt: String,
  regDt: String,
  delDt: String,
  delYn: String,
  permission: String
}, { collection: 'account' });

const Account = model<IAccountSchema>('account', AccountSchema);

export default Account;
