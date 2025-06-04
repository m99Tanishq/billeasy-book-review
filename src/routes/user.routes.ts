import { Router } from "express";
import { getAllUsersController, createUserController, updateUserController, deleteUserController } from "../controllers/user.controller";
import { zodValidator } from "../middlewares/zodValidator";
import { userSchema } from "../validators/user.schema";

export const userRoutes = Router();

userRoutes.get("/users", getAllUsersController);

userRoutes.post("/users", zodValidator(userSchema), createUserController);

userRoutes.put("/users/:id", zodValidator(userSchema), updateUserController);

userRoutes.delete("/users/:id", deleteUserController);