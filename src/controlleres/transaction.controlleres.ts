import { Request, Response } from "express";
import { ITransaction } from "../interfaces";
import { Transactionservices } from "../services";
import { msg, status } from "../utills";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NewRequest } from "../middlewares/verifytoken.middleware";
const Transactionvice = new Transactionservices();

export class Transactioncontrolleres {
  async addTransaction(req: NewRequest, res: Response) {
    try {
      let data: ITransaction = req.body;
      const TransactionData = await Transactionvice.addTransaction(data);
      res.status(status.ok).json(TransactionData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
  async getTransaction(req: NewRequest, res: Response) {
    try {
        const { Tid } = req.params;
      //   console.log(user);
      const TransactionData = await Transactionvice.getTransaction(Tid);
      res.status(status.ok).json(TransactionData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
  async updateTransaction(req: NewRequest, res: Response) {
    try {
      const { Transactionid } = req.params;
      let data: ITransaction = req.body;

      const TransactionData = await Transactionvice.updateTransaction(
        Transactionid,
        data
      );
      res.status(status.ok).json(TransactionData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
  async deleteTransaction(req: Request, res: Response) {
    try {
      const { Transactionid } = req.params;
      const TransactionData = await Transactionvice.deleteTransaction(
        Transactionid
      );
      res.status(status.ok).json(TransactionData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
}
