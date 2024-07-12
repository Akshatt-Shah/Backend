import { Request, Response } from "express";
import { IAccount } from "../interfaces";
import { Accountservices } from "../services";
import { msg, status } from "../utills";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NewRequest } from "../middlewares/verifytoken.middleware";
import { generateRandomAccountNumber } from "../middlewares";
const Accountvice = new Accountservices();

export class Accountcontrolleres {
  async registerAccount(req: NewRequest, res: Response) {
    try {
      let data: IAccount = req.body;
      data.Account_No = Number(generateRandomAccountNumber(10));
      data.user = req.user.userid;
      const AccountData = await Accountvice.registerAccount(data);
      res.status(status.ok).json(AccountData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
  async getAccount(req: NewRequest, res: Response) {
    try {
      const { user } = req;
      console.log(user);
      const AccountData = await Accountvice.getAccount(
        user.userid,
        user.userrole
      );
      res.status(status.ok).json(AccountData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
  async updateAccount(req: NewRequest, res: Response) {
    try {
      const { Accountid } = req.params;
      let data: IAccount = req.body;

      const AccountData = await Accountvice.updateAccount(Accountid, data);
      res.status(status.ok).json(AccountData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
  async deleteAccount(req: Request, res: Response) {
    try {
      const { Accountid } = req.params;
      const AccountData = await Accountvice.deleteAccount(Accountid);
      res.status(status.ok).json(AccountData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
}
