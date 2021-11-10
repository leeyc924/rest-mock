import dayjs from 'dayjs';
import express, { Request, Response, Router } from 'express';
import asyncify from 'express-asyncify';
import { v4 } from 'uuid';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import Account, { IAccountSchema } from '../database/schema/account';
import logUtil from '../utils/log';

const router: Router = asyncify(express.Router());

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const accountId = req.body.accountId;
    const accountPw = crypto.createHash('sha256').update(req.body.accountPw).digest('hex');
    const accountNm = req.body.accountNm;

    const account = await Account.findOne({
      accountId,
    });

    if (account) {
      throw new Error('email is exist');
    }

    const accountInfo: IAccountSchema = {
      accountId: accountId,
      accountPw: accountPw,
      accountNm: accountNm,
      lastLoginDt: dayjs().toISOString(),
      permission: 'USER',
      useYn: 'Y',
      delYn: 'N',
      delDt: '',
      pwChangeDt: dayjs().toISOString(),
      regDt: dayjs().toISOString(),
      modDt: dayjs().toISOString(),
    };

    await Account.create({ ...accountInfo });

    let payload: any = {};
    payload.accountId = accountId;
    payload.accountNm = accountNm;
    payload.permission = accountInfo.permission;

    const accessToken = await new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.JWT_SECRET || '', { expiresIn: '1d' }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });

    const result = {
      accessToken,
      accountInfo,
    };

    res.json(result);
  } catch (error: any) {
    logUtil.error(error.toString());

    res.status(401).send();
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const accountId = req.body.accountId;
    const accountPw = crypto.createHash('sha256').update(req.body.accountPw).digest('hex');

    const account = await Account.findOne({
      accountId,
    });

    if (account) {
      if (account.accountPw !== accountPw) {
        throw new Error('password incorrect.');
      }

      if (account.useYn !== 'Y') {
        throw new Error('email is not use.');
      }

      if (account.delYn !== 'N') {
        throw new Error('email is deleted.');
      }

      await Account.updateOne({ accountId: account.accountId }, { $set: { lastLoginDt: dayjs().toISOString() } });

      const payload = {
        accountId: account.accountId,
        accountNm: account.accountNm,
        permission: account.permission,
      };

      const accessToken = await new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET || '', { expiresIn: '1d' }, (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        });
      });

      let log = {
        logId: 'auth-sign-in',
      };
      logUtil.debug(log);

      const result = {
        accessToken: accessToken,
        accountInfo: account,
      };

      res.json(result);
    } else {
      throw new Error('account is not exist');
    }
  } catch (error: any) {
    logUtil.error(error.toString());

    res.status(401).send();
  }
});

export default router;
