import mogoose, { model, Schema } from 'mongoose';

// Book 에서 사용할 서브다큐먼트의 스키마입니다.
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
});

export default model('Account', Account);
