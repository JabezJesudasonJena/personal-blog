import { Router } from "express";
import AuthController from "../controllers/auth.mjs";
const authRouter = Router();

authRouter.post("/", AuthController.signup);
authRouter.get("/", AuthController.signin);

export default authRouter;