import accountModel from '../../database/models/account';

const AccountQuery = {
  accountById: accountModel.AccountTC.getResolver('findById'),
  accountByIds: accountModel.AccountTC.getResolver('findByIds'),
  accountOne: accountModel.AccountTC.getResolver('findOne'),
  accountMany: accountModel.AccountTC.getResolver('findMany'),
  accountCount: accountModel.AccountTC.getResolver('count'),
  accountConnection: accountModel.AccountTC.getResolver('connection'),
  accountPagenation: accountModel.AccountTC.getResolver('pagination'),
};

const AccountMutation = {
  accountCreateOne: accountModel.AccountTC.getResolver('createOne'),
  accountCreateMany: accountModel.AccountTC.getResolver('createMany'),
  accountUpdateById: accountModel.AccountTC.getResolver('updateById'),
  accountUpdateOne: accountModel.AccountTC.getResolver('updateOne'),
  accountUpdateMany: accountModel.AccountTC.getResolver('updateMany'),
  accountRemoveById: accountModel.AccountTC.getResolver('removeById'),
  accountRemoveOne: accountModel.AccountTC.getResolver('removeOne'),
  accountRemoveMany: accountModel.AccountTC.getResolver('removeMany'),
  fakeData: accountModel.AccountTC.getResolver('account'),
}

export { AccountQuery, AccountMutation }