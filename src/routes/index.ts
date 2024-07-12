import { urouter } from "./user.routes";
import { arouter } from "./account.routes";
import { trouter } from "./transaction.routes";
import { Router } from "express";

const route = Router();

route.use(urouter);
route.use(arouter);
route.use(trouter);

export { route };
