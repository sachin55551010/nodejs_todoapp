import express from "express";
import {
  getAllUsers,
  getUserDetails,
  login,
  logout,
  myProfile,
  register,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const userRouter = express.Router();

userRouter.get("/all", getAllUsers);

userRouter.post("/new", register);

userRouter.route("/userid/:id").get(getUserDetails);

userRouter.post("/login", login);

userRouter.get("/me", isAuthenticated, myProfile);

userRouter.post("/logout", logout);
