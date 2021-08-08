import { model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

const AccountSchema = new Schema({
  accountId: String,
  accountEmail: String,
  accountPw: String,
  placeId: String,
  viewPlaceId: String,
  accountType: String,
  accountAlias: String,
  lastLoginDt: String,
  accountEmailVerifyYn: String,
  imagePath: String,
  imageSize: String,
  useYn: String,
  delYn: String,
  delDt: String,
  regDt: String,
  modDt: String,
}, { collection: 'account' });

const Account = model('account', AccountSchema);

const AccountModel = {
  AccountSchema: Account,
  AccountTC: composeMongoose(Account),
};

export default AccountModel;
