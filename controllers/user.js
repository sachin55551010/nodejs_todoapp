import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import { ErrorHandler } from "../utils/errorhandler.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ Success: true, users });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  const { userName, userMail, userPassword } = req.body;
  try {
    let user = await User.findOne({ userMail });
    if (user) {
      next(new ErrorHandler("User Already Exsists", 404));
    } else {
      const hashPassword = await bcrypt.hash(userPassword, 10);
      user = await User.create({
        userName,
        userMail,
        userPassword: hashPassword,
      });
      sendCookies(user, res, "Registered Successfully", 201);
    }
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.status(200).json({ User: user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { userMail, userPassword } = req.body;
  try {
    let user = await User.findOne({ userMail }).select("+userPassword");
    if (!user) {
      return next(new ErrorHandler("Invalid Email", 400));
    }
    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid Password", 400));
    } else {
      sendCookies(user, res, `Welcome Back : ${user.userName}`, 200);
    }
  } catch (error) {
    next(error);
  }
};

export const myProfile = (req, res) => {
  res.json({ success: true, user: req.user });
};

export const logout = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
      samesite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ success: true, Message: "Logout Sucessfully" });
};
