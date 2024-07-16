import { Transactioncontrolleres } from "../controlleres";
const ucontrollere = new Transactioncontrolleres();
import { Router } from "express";
// import { authorizeRoles } from "../middlewares";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/verifytoken.middleware";
const trouter = Router();

trouter.post(
  "/Transaction/addTransaction",
  authenticateToken,
  authorizeRoles(["user"]),
  ucontrollere.addTransaction
);

trouter.get(
  "/Transaction/getTransaction/:Tid",
  authenticateToken,
  authorizeRoles(["user", "admin"]),
  ucontrollere.getTransaction
);
trouter.get(
  "/Transaction/getTransaction",
  authenticateToken,
  authorizeRoles(["user","admin"]),
  ucontrollere.getAllTransaction
);
trouter.put(
  "/Transaction/updateTransaction/:Transactionid",
  authenticateToken,
  authorizeRoles(["user"]),
  ucontrollere.updateTransaction
);
trouter.delete(
  "/Transaction/deleteTransaction/:Transactionid",
  authenticateToken,
  authorizeRoles(["admin"]),
  ucontrollere.deleteTransaction
);

export { trouter };
