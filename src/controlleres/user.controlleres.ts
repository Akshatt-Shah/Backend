import { Request, Response } from "express";
import { IUser } from "../interfaces";
import { userservices } from "../services";
import { msg, status } from "../utills";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NewRequest } from "../middlewares/verifytoken.middleware";
const uservice = new userservices();

export class usercontrolleres {
  async registerUser(req: Request, res: Response) {
    try {
      let data: IUser = req.body;
      data.password = String(await bcrypt.hash(data.password, 10));
      console.log(data);
      const userData = await uservice.registerUser(data);
      res.status(status.ok).json(userData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
  async getUser(req: NewRequest, res: Response) {
    try {
      const { user } = req;
      console.log(user);
      const userData = await uservice.getUser(user.userid, user.userrole);
      res.status(status.ok).json(userData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
  async getAllUser(req: NewRequest, res: Response) {
    try {
      const userData = await uservice.getAllUser();
      res.status(status.ok).json(userData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
  async updateUser(req: NewRequest, res: Response) {
    try {
      const { userid } = req.user;
      let data: IUser = req.body;
      if(data.password){
        data.password = String(await bcrypt.hash(data.password, 10));
      }
      const userData = await uservice.updateUser(userid, data);
      res.status(status.ok).json(userData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const userData = await uservice.deleteUser(userid);
      res.status(status.ok).json(userData);
    } catch (error: any) {
      res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData: any = await uservice.loginUser(email);
      if (userData.status === true) {
        const match = await bcrypt.compare(password, userData.data.password);
        // console.log(match);
        // console.log(userData);
        if (match) {
          const token = jwt.sign(
            { userid: userData.data._id, userrole: userData.data.role },
            "Akshat",
            { expiresIn: "24h" }
          );
          return res.status(status.ok).json({
            message: "User logged in",
            status: true,
            token: token,
            data: userData.data,
          });
        } else {
          return res
            .status(status.server_error)
            .json({ message: "Invalid password", status: false });
        }
      }
      return res.status(status.ok).json(userData);
    } catch (error: any) {
      return res
        .status(status.server_error)
        .json({ message: error.message, status: false });
    }
  }
}
