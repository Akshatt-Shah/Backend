import { usercontrolleres } from "../controlleres";
const ucontrollere = new usercontrolleres();
import { Router } from "express";
// import { authorizeRoles } from "../middlewares";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/verifytoken.middleware";
const urouter = Router();

urouter.post("/user/registerUser", ucontrollere.registerUser);

urouter.post("/user/loginuser", ucontrollere.loginUser);

urouter.get(
  "/user/getUser",
  authenticateToken,
  authorizeRoles(["user", "admin"]),
  ucontrollere.getUser
);
urouter.get(
  "/user/getAllUser",
  ucontrollere.getAllUser
);
urouter.put(
  "/user/updateuser",
  authenticateToken,
  authorizeRoles(["user", "admin"]),
  ucontrollere.updateUser
);
urouter.delete(
  "/user/deleteuser/:userid",
  authenticateToken,
  authorizeRoles(["admin"]),
  ucontrollere.deleteUser
);

export { urouter };
