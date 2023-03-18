import express from "express";
import { register, login, logout, selectAll } from "./userController";
import { validationMiddleware } from "./middleware/dataValidation";

const userRouter = express.Router();

userRouter.post("/register", validationMiddleware, register);
userRouter.post("/login", validationMiddleware, login);
userRouter.delete("/logout", logout);

// for testing, select all users
userRouter.get("/admin", selectAll);

export default userRouter;