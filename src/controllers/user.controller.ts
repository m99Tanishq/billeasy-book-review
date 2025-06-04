import { hash } from "bcrypt";
import { asyncHandler } from "../helpers/asyncHandler";
import { createUserService, deleteUserService, getAllUsersService, updateUserService } from "../services/user.services";

export const getAllUsersController = asyncHandler(async (req, res) => {
  const { clientId } = req.body;
  const { limit = 10, page = 1 } = req.query;
  const users = await getAllUsersService({ clientId, limit: Number(limit), page: Number(page) });
  return res.json(users);
});

export const createUserController = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await createUserService({ email, hashedPassword, name, clientId: 1 });
    return res.json(user);
});

export const updateUserController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { email, password, name } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await updateUserService(Number(id), { email, password: hashedPassword, name });
  return res.json(user);
});

export const deleteUserController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await deleteUserService(Number(id));
    return res.json(user);
});