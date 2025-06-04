import { Router } from "express";
import publicRoutes from "./public.routes";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";
import { userRoutes } from "./user.routes";

export const routes = Router();

routes.use("/", publicRoutes);
routes.use("/", authenticationMiddleware, userRoutes);


