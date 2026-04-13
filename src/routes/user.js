import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../contoller/users.js";
import { authenticateToken as protect } from '../contoller/middleware/auth.js';

const UserRouter = express.Router();

UserRouter.get("/api/users",protect, getAllUsers);
UserRouter.get("/api/users/:id",protect, getUserById);
UserRouter.post("/api/users", createUser);
UserRouter.put("/api/users/:id", protect,updateUser);
UserRouter.delete("/api/users/:id", protect,deleteUser);

export default UserRouter;