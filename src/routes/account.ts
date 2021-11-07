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
    const accountId = dayjs().unix() + v4().substr(0, 8);
    const userId = req.body.userId;
    const userPw = crypto.createHash('sha256').update(req.body.userPw).digest('hex');
    const userNm = req.body.userNm;

    const account = await Account.findOne({
      userId,
    });

    if (account) {
      throw new Error('email is exist');
    }

    const accountInfo: IAccountSchema = {
      accountId: accountId,
      userId: userId,
      userPw: userPw,
      userNm: userNm,
      lastLoginDt: dayjs().toISOString(),
      pwChangeDt: dayjs().toISOString(),
      imagePath: '',
      imageSize: '',
      useYn: 'Y',
      delYn: 'N',
      delDt: '',
      regDt: dayjs().toISOString(),
      modDt: dayjs().toISOString(),
    };

    await Account.create({ ...accountInfo });

    let payload: any = {};
    payload.accountId = accountId;
    payload.userId = userId;

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
      resultFlag: true,
      accessToken,
    };

    res.json(result);
  } catch (error: any) {
    logUtil.error(error.toString());

    const result = {
      resultFlag: false,
    };

    res.json(result);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const userPw = crypto.createHash('sha256').update(req.body.userPw).digest('hex');

    const account = await Account.findOne({
      userId,
    });

    if (account) {
      if (account.userPw !== userPw) {
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
        userId: account.userId,
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
        resultFlag: true,
        accessToken: accessToken,
      };

      res.json(result);
    } else {
      throw new Error('account is not exist');
    }
  } catch (error: any) {
    logUtil.error(error.toString());

    const result = {
      resultFlag: false,
    };

    res.json(result);
  }
});

export default router;
