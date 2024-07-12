import { Accountcontrolleres } from "../controlleres";
const ucontrollere = new Accountcontrolleres();
import { Router } from "express";
// import { authorizeRoles } from "../middlewares";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/verifytoken.middleware";
const arouter = Router();

arouter.post(
  "/Account/registerAccount",
  authenticateToken,
  authorizeRoles(["user"]),
  ucontrollere.registerAccount
);

arouter.get(
  "/Account/getAccount",
  authenticateToken,
  authorizeRoles(["user", "admin"]),
  ucontrollere.getAccount
);
arouter.put(
  "/Account/updateAccount/:Accountid",
  authenticateToken,
  authorizeRoles(["user", "admin"]),
  ucontrollere.updateAccount
);
arouter.delete(
  "/Account/deleteAccount/:Accountid",
  authenticateToken,
  authorizeRoles(["admin"]),
  ucontrollere.deleteAccount
);

export { arouter };
