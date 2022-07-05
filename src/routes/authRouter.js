import { Router } from "express";

import { signIn, signUp } from "./../controllers/authController.js";
import { signInMiddleware, signUpMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/signUp",signUpMiddleware,signUp);
authRouter.post("/signIn",signInMiddleware,signIn);

export default authRouter;