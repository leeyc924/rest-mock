import dayjs from 'dayjs';
import express, { Request, Response, Router } from 'express';
import asyncify from 'express-asyncify';
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
      const error = new Error('id is exist');
      error.name = 'IdExistError';
      throw error;
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

    const payload = accountInfo;

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

    res.status(400).json(error);
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
        const error = new Error('password incorrect.');
        error.name = 'PasswordIncorrectError';
        throw error;
      }

      if (account.useYn !== 'Y') {
        const error = new Error('id is not use.');
        error.name = 'IdNotUseError';
        throw error;
      }

      if (account.delYn !== 'N') {
        const error = new Error('id is deleted.');
        error.name = 'IdDeleteError';
        throw error;
      }

      await Account.updateOne({ accountId: account.accountId }, { $set: { lastLoginDt: dayjs().toISOString() } });

      const payload = {
        accountId: account.accountId,
        accountPw: account.accountPw,
        accountNm: account.accountNm,
        lastLoginDt: account.lastLoginDt,
        permission: account.permission,
        useYn: account.useYn,
        delYn: account.delYn,
        delDt: account.delDt,
        pwChangeDt: account.pwChangeDt,
        regDt: account.regDt,
        modDt: account.modDt,
      };

      const accessToken: string | undefined = await new Promise((resolve, reject) => {
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
      const error = new Error('id is not exist');
      error.name = 'IdNotExistError';
      throw error;
    }
  } catch (error: any) {
    logUtil.error(error.toString());

    res.status(400).json(error);
  }
});

router.post('/confirm-token', async (req: Request, res: Response) => {
  try {
    const accessToken = req.body.accessToken;

    const decodedData: { accountId: string; accountNm: string; accountPw: string; permission: string } = await new Promise(
      (resolve, reject) => {
        jwt.verify(accessToken, process.env.JWT_SECRET || '', (err, decodedData) => {
          if (err) {
            reject(err);
          } else {
            resolve(decodedData);
          }
        });
      },
    );

    const result = {
      accessToken,
      accountInfo: decodedData,
    };

    res.json(result);
  } catch (error: any) {
    logUtil.error(error.toString());

    res.status(403).json(error);
  }
});

export default router;
