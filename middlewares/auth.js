import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { ErrorHandler } from "../utils/errorhandler.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Please Login First", 400));
  const decoded = jwt.verify(token, "privateKey");
  req.user = await User.findById(decoded._id);

  next();
};
