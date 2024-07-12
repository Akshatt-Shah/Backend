import { NextFunction, Request, Response } from "express";
import { NewRequest } from "./verifytoken.middleware";

// authMiddleware.js
export function authorizeRoles(allowedRoles: string[]) {
  return (req: NewRequest, res: Response, next: NextFunction) => {
    const userRole = req.user.role; // Assuming the user's role is stored in req.user

    if (allowedRoles.includes(userRole as string)) {
      next(); // User is authorized, proceed to the next middleware or route handler
    } else {
      res
        .status(403)
        .json({
          message: "Forbidden: You do not have the required permissions",
        });
    }
  };
}

module.exports = authorizeRoles;
