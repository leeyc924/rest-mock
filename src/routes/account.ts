import express from 'express';
import asyncify from 'express-asyncify';
import dayjs from 'dayjs';
const { v4 } = require('uuid');
import crypto from 'crypto';
import path from 'path';
import logUtil from '../utils/log';

import Account from '../database/models/account';

const router = asyncify(express.Router());

router.post('/create', async (req: express.Request, res: express.Response) => {
  try {
    const account = await Account.create({
      accountId: req.body.accountId,
      accountEmail: req.body.accountEmail,
      accountPw: req.body.accountPw,
      placeId: dayjs().unix() + v4().substr(0, 8),
      viewPlaceId: '',
      accountType: '',
      accountAlias: v4(),
      lastLoginDt: '',
      accountEmailVerifyYn: 'N',
      imagePath: '',
      imageSize: '',
      useYn: 'Y',
      delYn: 'N',
      delDt: '',
      regDt: dayjs().toISOString(),
      modDt: dayjs().toISOString(),
    });

    res.json(account);
  } catch (err) {
    logUtil.error(err.toString());
    let result: any = {};
    result.resultFlag = false;
    res.json(result);
  }
});

export default router;