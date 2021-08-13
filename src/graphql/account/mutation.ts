import dayjs from "dayjs";
import { v4 } from "uuid";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import logUtil from '../../utils/log';
import Account from "../../database/models/account";

export const signUp = async (args) => {
  try {
    const accountId = dayjs().unix() + v4().substr(0, 8);
    const accountEmail = args.accountEmail;
    let accountPw = args.accountPw;
    const placeId = dayjs().unix() + v4().substr(0, 8);
    const viewPlaceId = dayjs().unix() + v4().substr(0, 8);
    const accountType = '';
    const lastLoginDt = dayjs().toISOString();
    const pwChangeDt = dayjs().toISOString();
    const imagePath = '';
    const imageSize = '';
    const useYn = 'Y';
    const delYn = 'N';
    const delDt = '';
    const regDt = dayjs().toISOString();
    const modDt = dayjs().toISOString();

    const hashPw = crypto.createHash('sha256').update(accountPw).digest('hex');

    const accountInfo = {
      accountId,
      accountEmail,
      accountPw: hashPw,
      placeId,
      viewPlaceId,
      accountType,
      lastLoginDt,
      pwChangeDt,
      imagePath,
      imageSize,
      useYn,
      delYn,
      delDt,
      regDt,
      modDt,
    }

    await Account.create({
      ...accountInfo,
    });

    let payload: any = {};
    payload.accountId = accountId;
    payload.accountEmail = accountEmail;

    const accessToken = await new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.CORE_JWT_SECRET || '',
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

    return { accessToken };
  } catch (error) {
    logUtil.error(error.toString());

    return false;
  }
};