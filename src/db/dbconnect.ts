import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "config";
import { route } from "../routes";
const port = String(config.get("PORT"));
const mongourl = String(config.get("MongoUrl"));
export function startserver() {
  try {
    const app = express();
    app.use(cookieParser());
    app.use(express.json());
    app.use(
      cors({
        origin: "http://localhost:4200",
        credentials: true,
      })
    );
    app.use(route);
    mongoose
      .connect(mongourl)
      .then((response: any) => {
        console.log("MongoDb Connected Successfully...");
        app.listen(port, () => {
          console.log("App Listening On Port " + port);
        });
      })
      .catch((error: any) => {
        console.log("MongoDB Connection Error!!!!!!!!!!!!");
      });
  } catch (error: any) {
    console.log(error.message);
  }
}
