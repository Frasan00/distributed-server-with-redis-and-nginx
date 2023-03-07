import express from "express";
import { register, login, logout } from "./userController";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.delete("/logout", logout);

export default userRouter;