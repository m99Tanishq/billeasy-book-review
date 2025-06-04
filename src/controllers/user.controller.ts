import { hash } from "bcrypt";
import { asyncHandler } from "../helpers/asyncHandler";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  updateUserService,
} from "../services/user.service";
import { Request, Response } from "express";

export const getAllUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const { clientId } = req.body;
    const { limit = 10, page = 1 } = req.query;
    const users = await getAllUsersService({
      clientId,
      limit: Number(limit),
      page: Number(page),
    });
    res.status(200).json(users);
  }
);

export const createUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await createUserService({
      email,
      hashedPassword,
      name,
      clientId: 1,
    });
    res.status(200).json(user);
  }
);

export const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { email, password, name } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await updateUserService(Number(userId), {
      email,
      password: hashedPassword,
      name,
    });
    res.status(200).json(user);
  }
);

export const deleteUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await deleteUserService(Number(userId));
    res.status(200).json(user);
  }
);
