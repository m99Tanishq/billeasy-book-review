import jwt from "jsonwebtoken";
import { asyncHandler } from "../helpers/asyncHandler";
import { AppError, ERRORS } from "./error.middleware";
import { JWT_SECRET } from "../config/constants";
import { NextFunction } from "express";
import { Request } from "express";
import { Response } from "express";

//Extending request interface to include authentication data
declare module "express-serve-static-core" {
  interface Request {
    token: string;
    email: string;
    name: string;
  }
}

export type TokenPayload = {
  email: string;
  name: string;
  exp: number;
};

//Middleware to authenticate user based on token
export const authenticationMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    throw new AppError(ERRORS.AUTH_FAILED.message, ERRORS.AUTH_FAILED.status);
  }
  const token = authHeader.split(" ")[1];

  //Checking if token is valid
  let decodedToken: TokenPayload | null = null;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new AppError(ERRORS.AUTH_FAILED.message, ERRORS.AUTH_FAILED.status);
  }

  if (!decodedToken) {
    throw new AppError(ERRORS.AUTH_FAILED.message, ERRORS.AUTH_FAILED.status);
  }

  //Check expiry
  if (decodedToken.exp < Date.now() / 1000) {
    throw new AppError(ERRORS.AUTH_FAILED.message, ERRORS.AUTH_FAILED.status);
  }

  //Authorization successful
  req.token = token;
  req.email = decodedToken.email;
  req.name = decodedToken.name;
  next();
});
