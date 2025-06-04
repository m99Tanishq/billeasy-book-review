import { asyncHandler } from "../helpers/asyncHandler";
import { AppError, ERRORS } from "../middlewares/error.middleware";
import { LoginSchema } from "../validators/login.schema";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants";
import { SignUpSchema } from "../validators/signup.schema";
import {
  findUserByEmailService,
  createUserService,
} from "../services/user.service";
import { Request, Response } from "express";

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password }: LoginSchema = req.body;
    if (!password || !email) throw new AppError(ERRORS.MISSING_VALUES.message);

    const user = await findUserByEmailService(email, true); //true to include password
    if (!user) throw new AppError(ERRORS.INVALID_EMAIL_PASSWORD.message);

    const doMatch = await compare(password, user.password);
    if (!doMatch) {
      //Login failed
      throw new AppError(ERRORS.INVALID_EMAIL_PASSWORD.message);
    }

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: "168h" }
    );
    res
      .status(200)
      .json({ success: true, email: user.email, token, name: user.name });
  }
);

export const signUpController = asyncHandler(async (req, res) => {
  const { email, password, name }: SignUpSchema = req.body;
  if (!password || !email || !name)
    throw new AppError(ERRORS.MISSING_VALUES.message);

  const user = await findUserByEmailService(email, true);
  if (user) throw new AppError(ERRORS.USER_ALREADY_EXISTS.message);

  const hashedPassword = await hash(password, 10);

  const newUser = await createUserService({
    email,
    hashedPassword,
    name,
    clientId: 1,
  });
  res
    .status(200)
    .json({ success: true, email: newUser.email, name: newUser.name });
});
