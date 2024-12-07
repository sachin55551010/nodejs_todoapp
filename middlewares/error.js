export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Server Internal Error";

  res.status(err.statusCode).json({ success: false, ErrorMsg: err.message });
};
