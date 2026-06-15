import { Router } from "express";
import articleRouter from "./articleRoute.mjs";
import authRouter from "./authRoute.mjs";

const router = Router();

router.use("/auth", authRouter);
router.use("/article", articleRouter);

export default router;