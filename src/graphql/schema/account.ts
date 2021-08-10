import accountModel from '../../database/models/account';
import '../mutation/auccount';

const AccountQuery = {
  accountById: accountModel.AccountTC.mongooseResolvers.findById(),
  // accountByIds: accountModel.AccountTC.getResolver('findByIds'),
  // accountOne: accountModel.AccountTC.getResolver('findOne'),
  // accountMany: accountModel.AccountTC.mongooseResolvers.findMany(),
  // accountCount: accountModel.AccountTC.getResolver('count'),
  // accountConnection: accountModel.AccountTC.getResolver('connection'),
  // accountPagenation: accountModel.AccountTC.getResolver('pagination'),
};

const AccountMutation = {
  // signUp: accountModel.AccountTC.getResolver('signUp'),
  signUp: accountModel.AccountTC.getResolver('createOne'),
  // accountCreateOne: accountModel.AccountTC.getResolver('createOne'),
  // accountUpdateById: accountModel.AccountTC.getResolver('updateById'),
  // accountCreateMany: accountModel.AccountTC.getResolver('createMany'),
  // accountUpdateOne: accountModel.AccountTC.getResolver('updateOne'),
  // accountUpdateMany: accountModel.AccountTC.getResolver('updateMany'),
  // accountRemoveById: accountModel.AccountTC.getResolver('removeById'),
  // accountRemoveOne: accountModel.AccountTC.getResolver('removeOne'),
  // accountRemoveMany: accountModel.AccountTC.getResolver('removeMany'),
  // fakeData: accountModel.AccountTC.getResolver('account'),
}

export { AccountQuery, AccountMutation }