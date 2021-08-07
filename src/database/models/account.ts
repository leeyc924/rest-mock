import { model, Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

const Account = new Schema({
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

const AccountModel = {
  AccountSchema: model('account', Account),
  AccountTC: composeMongoose(model('account', Account)),
};

export default AccountModel;
