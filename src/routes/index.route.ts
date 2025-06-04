import { Router } from "express";
import publicRoutes from "./public.route";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";
import { userRoutes } from "./user.route";
import { bookRoutes } from "./book.route";
import { reviewRoutes } from "./review.route";

export const routes = Router();

routes.use("/", publicRoutes);
routes.use("/", authenticationMiddleware, userRoutes);
routes.use("/", authenticationMiddleware, bookRoutes);
routes.use("/", authenticationMiddleware, reviewRoutes);



