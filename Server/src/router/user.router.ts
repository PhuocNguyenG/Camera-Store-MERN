import { Router } from "express";
import { authController, userController } from "../controller";

export const userRoute = Router();

userRoute.get("/", userController.getUser);
userRoute.post("/", userController.updateUser);
userRoute.post("/register", authController.postRegister);
userRoute.post("/login", authController.postLogin);
