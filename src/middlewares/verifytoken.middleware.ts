import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";

const secretKey = String(config.get("SecretKey"));

export interface NewRequest extends Request {
  user?: any; // Assuming the token contains the user's role
}

export function authenticateToken(req: NewRequest, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (token == null) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    console.log(user);
    req.user = user; // Assuming the token contains the user's role
    req.headers['authorization'] = token;
    next();
  });
}

export function authorizeRoles(allowedRoles: string[]) {
  return (req: NewRequest, res: Response, next: NextFunction) => {
    // console.log(req.user.)
    if (!req.user || !allowedRoles.includes(req.user.userrole)) {
      return res.status(403).json({ message: "Forbidden: You do not have the required permissions" });
    }
    next();
  };
}
