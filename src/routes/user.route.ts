import { Router } from "express";
import { getAllUsersController, createUserController, updateUserController, deleteUserController } from "../controllers/user.controller";
import { zodValidator } from "../middlewares/zodValidator";
import { userSchema } from "../validators/user.schema";

export const userRoutes = Router();

userRoutes.get("/", getAllUsersController);

userRoutes.post("/", zodValidator(userSchema), createUserController);

userRoutes.put("/:userId", zodValidator(userSchema), updateUserController);

userRoutes.delete("/:userId", deleteUserController);