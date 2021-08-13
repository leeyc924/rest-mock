import { accountType } from "./index";
import Account from "../../database/models/account";

export const find = {
  type: accountType,
  resolve(parent, args) {
    return Account.find({});
  }
};