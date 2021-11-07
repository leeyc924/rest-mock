import { model, Schema } from 'mongoose';

export interface IAccountSchema {
  accountId: string,
  userId: string,
  userPw: string,
  userNm: string,
  lastLoginDt: string,
  pwChangeDt: string,
  imagePath: string,
  imageSize: string,
  useYn: string,
  regDt: string,
  modDt: string,
  delYn: string,
  delDt: string,
}

const AccountSchema = new Schema({
  accountId: String,
  userId: String,
  userPw: String,
  userNm: String,
  lastLoginDt: String,
  pwChangeDt: String,
  imagePath: String,
  imageSize: String,
  useYn: String,
  regDt: String,
  modDt: String,
  delYn: String,
  delDt: String,
}, { collection: 'account' });

const Account = model<IAccountSchema>('account', AccountSchema);

export default Account;
