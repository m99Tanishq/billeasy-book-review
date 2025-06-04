import { Router } from "express";
import { zodValidator } from "../middlewares/zodValidator";
import { LoginSchema } from "../validators/login.schema";
import { SignUpSchema } from "../validators/signup.schema";
import { loginController, signUpController } from "../controllers/login.controller";

const publicRoutes = Router();

publicRoutes.post("/login", zodValidator(LoginSchema), loginController);
publicRoutes.post("/signup", zodValidator(SignUpSchema), signUpController);

export default publicRoutes;
