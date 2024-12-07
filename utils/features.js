import jwt from "jsonwebtoken";

export const sendCookies = (user, res, message, statusCode = 201) => {
  const token = jwt.sign({ _id: user._id }, "privateKey");
  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      samesite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ Success: true, Message: message });
};
