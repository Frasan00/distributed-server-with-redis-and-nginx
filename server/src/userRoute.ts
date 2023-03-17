import express from "express";
import { register, login, logout } from "./userController";
import { validationMiddleware } from "./middleware/dataValidation";

const userRouter = express.Router();

userRouter.post("/register", validationMiddleware, register);
userRouter.post("/login", validationMiddleware, login);
userRouter.delete("/logout", logout);

export default userRouter;