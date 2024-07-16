import mongoose from "mongoose";
import { ITransaction } from "../interfaces";
import { Transaction } from "../models";
import { msg } from "../utills";
import { Accountservices } from "./account.services";
import User from "../models/user.model";
const Aservice = new Accountservices();

export class Transactionservices {
  async addTransaction(data: ITransaction) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      if (
        data.transactionType === "Credit" ||
        data.transactionType === "Debit"
      ) {
        data.receiver_account_no = data.sender_account_no;
        const AccountBalance = await Aservice.updateAccountBalance(
          String(data.sender_account_no),
          data.transactionType,
          { totalamount: data.amount }
        );
        console.log(AccountBalance);
        if (AccountBalance.status === false) {
          await session.abortTransaction();
          session.endSession();
          return { message: AccountBalance.message, status: false };
        } else {
          const Transactiondata = await Transaction.create(data);
          console.log(Transactiondata);
          //   const TData = await Transaction.aggregate([
          //     {}
          //   ]);
          await session.commitTransaction();
          session.endSession();
          return {
            message: msg.addsuccess("Transaction"),
            status: true,
            data: Transactiondata,
          };
        }
      } else {
        const debitdata: any = await Aservice.updateAccountBalance(
          String(data.sender_account_no),
          "Debit",
          { totalamount: data.amount }
        );
        console.log("Debit", debitdata);
        if (debitdata.status === false) {
          await session.abortTransaction();
          session.endSession();
          return { message: debitdata.message, status: false };
        } else {
          const creditdata = await Aservice.updateAccountBalance(
            String(data.receiver_account_no),
            "Credit",
            { totalamount: data.amount }
          );
          console.log("Credit", creditdata);
          const Transactiondata = await Transaction.create(data);
          console.log(Transactiondata);
          await session.commitTransaction();
          session.endSession();
          return {
            message: msg.addsuccess("Transaction"),
            status: true,
            data: Transactiondata,
          };
        }
      }
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      return { message: error.message, status: false };
    }
  }
  async getTransaction(id: string) {
    try {
      const Transactiondata = await Transaction.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "accounts",
            localField: "sender_account_no",
            foreignField: "Account_No",
            as: "SenderAccount",
          },
        },

        {
          $lookup: {
            from: "accounts",
            localField: "receiver_account_no",
            foreignField: "Account_No",
            as: "ReciewerAccount",
          },
        },
        {
          $unwind: {
            path: "$SenderAccount",
          },
        },
        {
          $unwind: {
            path: "$ReciewerAccount",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "SenderAccount.user",
            foreignField: "_id",
            as: "SenderUser",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "ReciewerAccount.user",
            foreignField: "_id",
            as: "ReciewerUser",
          },
        },
        {
          $project: {
            _id: 1,
            transactionType: 1,
            amount: 1,
            Sender: { $first: ["$SenderUser.name"] },
            Reciewer: { $first: ["$ReciewerUser.name"] },
            date: 1,
          },
        },
      ]);
      console.log(Transactiondata);
      return {
        message: msg.getsuccess("Transaction"),
        status: true,
        data: Transactiondata,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async getAllTransaction(id: String, role: String) {
    try {
      if (role === "admin") {
        const Transactiondata = await Transaction.aggregate([
          {
            $lookup: {
              from: "accounts",
              localField: "sender_account_no",
              foreignField: "Account_No",
              as: "SenderAccount",
            },
          },

          {
            $lookup: {
              from: "accounts",
              localField: "receiver_account_no",
              foreignField: "Account_No",
              as: "ReciewerAccount",
            },
          },
          {
            $unwind: {
              path: "$SenderAccount",
            },
          },
          {
            $unwind: {
              path: "$ReciewerAccount",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "SenderAccount.user",
              foreignField: "_id",
              as: "SenderUser",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "ReciewerAccount.user",
              foreignField: "_id",
              as: "ReciewerUser",
            },
          },
          {
            $project: {
              _id: 1,
              transactionType: 1,
              amount: 1,
              SenderAccount_No: "$SenderAccount.Account_No",
              // Sender_id: { $first: ["$SenderUser._id"] },
              Sender_Name: { $first: ["$SenderUser.name"] },
              RecieverAccount_No: "$ReciewerAccount.Account_No",
              // Reciewer_id: { $first: ["$ReciewerUser._id"] },
              Reciewer_Name: { $first: ["$ReciewerUser.name"] },
              date: 1,
            },
          },
        ]);
        console.log(Transactiondata);
        return {
          message: msg.getsuccess("Transaction"),
          status: true,
          data: Transactiondata,
        };
      } else {
        const Transactiondata = await Transaction.aggregate([
          {
            $match: {
              userid: new mongoose.Types.ObjectId(String(id)),
            },
          },
          {
            $lookup: {
              from: "accounts",
              localField: "sender_account_no",
              foreignField: "Account_No",
              as: "SenderAccount",
            },
          },

          {
            $lookup: {
              from: "accounts",
              localField: "receiver_account_no",
              foreignField: "Account_No",
              as: "ReciewerAccount",
            },
          },
          {
            $unwind: {
              path: "$SenderAccount",
            },
          },
          {
            $unwind: {
              path: "$ReciewerAccount",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "SenderAccount.user",
              foreignField: "_id",
              as: "SenderUser",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "ReciewerAccount.user",
              foreignField: "_id",
              as: "ReciewerUser",
            },
          },
          {
            $project: {
              _id: 1,
              transactionType: 1,
              amount: 1,
              SenderAccount_No: "$SenderAccount.Account_No",
              // Sender_id: { $first: ["$SenderUser._id"] },
              Sender_Name: { $first: ["$SenderUser.name"] },
              RecieverAccount_No: "$ReciewerAccount.Account_No",
              // Reciewer_id: { $first: ["$ReciewerUser._id"] },
              Reciewer_Name: { $first: ["$ReciewerUser.name"] },
              date: 1,
            },
          },
        ]);
        console.log(Transactiondata);
        return {
          message: msg.getsuccess("Transaction"),
          status: true,
          data: Transactiondata,
        };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async updateTransaction(id: String, data: ITransaction) {
    try {
      const Transactiondata = await Transaction.findOneAndUpdate(
        { Transaction_No: id },
        data,
        {
          new: true,
        }
      );
      return {
        message: msg.updatesuccess("Transaction"),
        status: true,
        data: Transactiondata,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async deleteTransaction(id: String) {
    try {
      const Transactiondata = await Transaction.findOneAndDelete({
        Transaction_No: id,
      });
      return {
        message: msg.deletesuccess("Transaction"),
        status: true,
        data: Transactiondata,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}
