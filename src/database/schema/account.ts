import { model, Schema } from 'mongoose';

interface IAccountSchema {
  accountId: String,
  accountEmail: String,
  accountPw: String,
  accountNm: String,
  placeId: String,
  viewPlaceId: String,
  loginType: String,
  lastLoginDt: String,
  pwChangeDt: String,
  imagePath: String,
  imageSize: String,
  useYn: String,
  delYn: String,
  delDt: String,
  regDt: String,
  modDt: String,
}

const AccountSchema = new Schema({
  accountId: String,
  accountEmail: String,
  accountPw: String,
  accountNm: String,
  placeId: String,
  viewPlaceId: String,
  loginType: String,
  lastLoginDt: String,
  pwChangeDt: String,
  imagePath: String,
  imageSize: String,
  useYn: String,
  delYn: String,
  delDt: String,
  regDt: String,
  modDt: String,
}, { collection: 'account' });

const Account = model<IAccountSchema>('account', AccountSchema);

export default Account;
