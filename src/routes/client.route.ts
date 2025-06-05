import { Router } from "express";
import { clientSignUpController } from "../controllers/client.controller";

const clientRoutes = Router();

clientRoutes.post("/signup", clientSignUpController);

export default clientRoutes;