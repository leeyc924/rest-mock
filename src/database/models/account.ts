import { model, Schema } from 'mongoose';

const AccountSchema = new Schema({
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
  modDt: String,
}, { collection: 'account' });

const Account = model('account', AccountSchema);

export default Account;
