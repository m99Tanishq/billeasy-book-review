import type { NextFunction, Request, Response } from "express";

//Custom Error
export class AppError extends Error {
  status: number;
  constructor(message = "App Error", status = 400) {
    super(message);
    this.status = status;
  }
}

//Error Handling middleware
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = err.message;
  const status = err instanceof AppError ? err.status : 500;
  console.error(err);

  return res.status(status).json({ error: message });
};

//Error Codes
export const ERRORS = {
  INVALID_EMAIL_PASSWORD: {
    status: 400,
    message: "Email or Password is incorrect",
  },
  MISSING_VALUES: {
    status: 400,
    message: "Some of the required values are missing",
  },
  VALIDATION_FAILED: {
    status: 400,
    message: "Request validation failed",
  },
  NO_USER: {
    status: 400,
    message: "User not found",
  },
  AUTH_FAILED: {
    status: 401,
    message: "Authentication failed",
  },
  USER_ALREADY_EXISTS: {
    status: 400,
    message: "User already exists",
  },
};
