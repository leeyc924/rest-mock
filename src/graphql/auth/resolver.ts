import dayjs from "dayjs";
import { v4 } from "uuid";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import logUtil from "../../utils/log";
import Account from "../../database/schema/account";
import { ILoginArg, ISignUpArg } from "./model";

export const signUp = async (args: ISignUpArg) => {
  try {
    const accountId = dayjs().unix() + v4().substr(0, 8);
    const accountEmail = args.accountEmail;
    const accountPw = crypto.createHash("sha256").update(args.accountPw).digest("hex");
    const accountNm = args.accountNm;

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

    return { accessToken };
  } catch (error) {
    logUtil.error(error.toString());

    throw new Error(error.toString());
  }
};

export const login = async (args: ILoginArg) => {
  try {
    const accountEmail = args.accountEmail;
    const accountPw = crypto.createHash("sha256").update(args.accountPw).digest("hex");
    const loginType = args.loginType;

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

      let result: any = {};
      result.accessToken = accessToken;
      result.loginInfo = payload;

      return result;
    } else {
      throw new Error("account is not exist");
    }
  } catch (error) {
    logUtil.error(error.toString());

    throw new Error(error.toString());
  }
};