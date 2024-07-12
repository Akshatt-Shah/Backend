import { IAccount } from "../interfaces";
import { Account } from "../models";
import { msg } from "../utills";

export class Accountservices {
  async registerAccount(data: IAccount) {
    try {
      const Accountdata = await Account.create(data);
      console.log(Accountdata);
      return {
        message: msg.addsuccess("Account"),
        status: true,
        data: Accountdata,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async getAccount(id: String, role: String) {
    try {
      if (role === "admin") {
        const Accountdata = await Account.find();
        return {
          message: msg.getsuccess("Account"),
          status: true,
          data: Accountdata,
        };
      } else {
        const Accountdata = await Account.find({ user: id });
        return {
          message: msg.getsuccess("Account"),
          status: true,
          data: Accountdata,
        };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async updateAccount(id: String, data: IAccount) {
    try {
      const Accountdata = await Account.findOneAndUpdate(
        { Account_No: id },
        data,
        {
          new: true,
        }
      );
      return {
        message: msg.updatesuccess("Account"),
        status: true,
        data: Accountdata,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async updateAccountBalance(id: String, type: String, data: IAccount) {
    try {
        console.log(type)
      if (type === "Credit") {
        console.log("credit")
        const Accountdata: any = await Account.findOne({ Account_No: id });
        Accountdata.totalamount = Accountdata.totalamount + data.totalamount;
        Accountdata.save();
        return {
          message: msg.updatesuccess("Account"),
          status: true,
          data: Accountdata,
        };
      } else {
        console.log("debit")
        const Accountdata: any = await Account.findOne({ Account_No: id });
        if (Accountdata.totalamount >= data.totalamount!) {
            console.log(Accountdata.totalamount)
          Accountdata.totalamount = Accountdata.totalamount - data.totalamount!;
          Accountdata.save();
          return {
            message: msg.updatesuccess("Account"),
            status: true,
            data: Accountdata,
          };
        } else {
          return {
            message: "Insufficient Balance",
            status: false,
          };
        }
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async deleteAccount(id: String) {
    try {
      const Accountdata = await Account.findOneAndDelete({ Account_No: id });
      return {
        message: msg.deletesuccess("Account"),
        status: true,
        data: Accountdata,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}
