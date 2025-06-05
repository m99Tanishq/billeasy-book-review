import { Router, Request, Response } from "express";
import publicRoutes from "./public.route";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";
import { userRoutes } from "./user.route";
import { bookRoutes } from "./book.route";
import { reviewRoutes } from "./review.route";
import clientRoutes from "./client.route";

export const routes = Router();

routes.use("/", publicRoutes);
routes.use("/users", authenticationMiddleware, userRoutes);
routes.use("/books", authenticationMiddleware, bookRoutes);
routes.use("/reviews", authenticationMiddleware, reviewRoutes);
routes.use("/clients", clientRoutes);

routes.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});



