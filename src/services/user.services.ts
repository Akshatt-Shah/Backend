import { IUser } from "../interfaces";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { msg } from "../utills";

export class userservices {
  async registerUser(data: IUser) {
    try {
      const userdata = await User.create(data);
      console.log(userdata);
      return { message: msg.addsuccess("User"), status: true, data: userdata };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async getUser(id: String, role: String) {
    try {
      if (role === "user") {
        const userdata = await User.find({ _id: id });
        return {
          message: msg.getsuccess("User"),
          status: true,
          data: userdata,
        };
      } else {
        const userdata = await User.find();
        return {
          message: msg.getsuccess("User"),
          status: true,
          data: userdata,
        };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async getAllUser() {
    try {
      const userdata = await User.find();
        return {
          message: msg.getsuccess("User"),
          status: true,
          data: userdata,
        };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async updateUser(id: String, data: IUser) {
    try {
      const userdata = await User.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      return {
        message: msg.updatesuccess("User"),
        status: true,
        data: userdata,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async deleteUser(id: String) {
    try {
      const userdata = await User.findOneAndDelete({ _id: id });
      return {
        message: msg.deletesuccess("User"),
        status: true,
        data: userdata,
      };
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
  async loginUser(email: String) {
    try {
      const userdata = await User.findOne({ email: email });
      if (userdata) {
        return {
          message: msg.getsuccess("User"),
          status: true,
          data: userdata,
        };
      } else {
        return { message: "User not found", status: false };
      }
    } catch (error: any) {
      return { message: error.message, status: false };
    }
  }
}
