import jwt from 'jsonwebtoken';

import AccountModel from "../../database/models/account";

AccountModel.AccountTC.addResolver({
  name: 'findById',
  args: { id: 'Int' },
  type: AccountModel.AccountTC,
  resolve: async ({ source, args }) => {
    const res = await AccountModel.AccountSchema.findById(args.accountId);
    const data = await res.json();
    return data;
  },
});

AccountModel.AccountTC.addResolver({
  name: 'findMany',
  type: AccountModel.AccountTC,
  resolve: async ({ source, args }) => {
    const res = await AccountModel.AccountSchema.find();
    const data = res;
    return data;
  },
});

AccountModel.AccountTC.addResolver({
  name: 'createOne',
  args: { id: 'Int' },
  type: AccountModel.AccountTC,
  resolve: async ({ source, args }) => {
    const accountId = args.accountId;
    const accountEmail = args.accountEmail;

    let payload: any = {};
    payload.accountId = accountId;
    payload.accountEmail = accountEmail;

    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.JWT_SECRET || '',
        { expiresIn: '1d' },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        },
      );
    });
    const res = await AccountModel.AccountSchema.find();
    const data = await res.json();
    return data;
  },
});