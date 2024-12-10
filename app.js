import express from "express";
import { userRouter } from "./routes/user.js";
import cookieParser from "cookie-parser";
import { taskRouter } from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

console.log(process.env.FRONTEND_URL);

// using routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

app.use(errorMiddleware);
