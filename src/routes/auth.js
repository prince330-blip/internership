import express from "express";
import { Register, login, resetPassword } from "../contoller/auth.js";
import { authenticateToken } from "../contoller/middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/api/register", Register);
authRouter.post("/api/login", login);
authRouter.post("/api/reset-password", authenticateToken, resetPassword);

export default authRouter;