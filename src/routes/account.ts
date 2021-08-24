import dayjs from 'dayjs';
import express, { Request, Response, Router } from 'express';
import asyncify from 'express-asyncify';
import { v4 } from 'uuid';
import crypto from "crypto";
import jwt from "jsonwebtoken";

import Account from '../database/schema/account';
import logUtil from "../utils/log";

const router: Router = asyncify(express.Router());

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const accountId = dayjs().unix() + v4().substr(0, 8);
    const accountEmail = req.body.accountEmail;
    const accountPw = crypto.createHash("sha256").update(req.body.accountPw).digest("hex");
    const accountNm = req.body.accountNm;

    const account = await Account.findOne({
      accountEmail,
    });

    if (account) {
      throw new Error("email is exist");
    }

    const accountInfo = {
      accountId: accountId,
      accountEmail: accountEmail,
      accountPw: accountPw,
      accountNm: accountNm,
      placeId: dayjs().unix() + v4().substr(0, 8),
      viewPlaceId: dayjs().unix() + v4().substr(0, 8),
      loginType: "",
      lastLoginDt: dayjs().toISOString(),
      pwChangeDt: dayjs().toISOString(),
      imagePath: "",
      imageSize: "",
      useYn: "Y",
      delYn: "N",
      delDt: "",
      regDt: dayjs().toISOString(),
      modDt: dayjs().toISOString(),
    };

    await Account.create({ ...accountInfo });

    let payload: any = {};
    payload.accountId = accountId;
    payload.accountEmail = accountEmail;

    const accessToken = await new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.JWT_SECRET || "",
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });

    const result = {
      resultFlag: true,
      accessToken,
    };

    res.json(result);
  } catch (err) {
    logUtil.error(err.toString());

    const result = {
      resultFlag: false,
    };

    res.json(result);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const accountEmail = req.body.accountEmail;
    const accountPw = crypto.createHash("sha256").update(req.body.accountPw).digest("hex");
    const loginType = req.body.loginType;

    const account = await Account.findOne({
      accountEmail,
    });

    if (account) {
      if (account.accountPw !== accountPw) {
        throw new Error("password incorrect.");
      }

      if (account.useYn !== "Y") {
        throw new Error("email is not use.");
      }

      if (account.delYn !== "N") {
        throw new Error("email is deleted.");
      }

      await Account.updateOne({ accountId: account.accountId }, { $set: { lastLoginDt: dayjs().toISOString() } });

      const payload: any = {};
      payload.loginId = account.accountEmail;
      payload.accountId = account.accountId;
      payload.accountEmail = account.accountEmail;
      payload.accountNm = account.accountNm;
      payload.imagePath = account.imagePath;
      payload.imageSize = account.imageSize;
      payload.placeId = account.placeId;
      payload.viewPlaceId = account.placeId;
      payload.lastLoginDt = account.lastLoginDt;
      payload.loginType = loginType;

      const accessToken = await new Promise((resolve, reject) => {
        jwt.sign(
          payload,
          process.env.JWT_SECRET || "",
          { expiresIn: "1d" },
          (err, token) => {
            if (err) {
              reject(err);
            } else {
              resolve(token);
            }
          }
        );
      });

      let log: any = {};
      log.logId = "auth-sign-in";
      logUtil.debug(log);

      const result = {
        accessToken: accessToken,
        loginInfo: payload,
      };

      res.json(result);
    } else {
      throw new Error("account is not exist");
    }
  } catch (error) {
    logUtil.error(error.toString());

    res.status(404);
  }
});

export default router;