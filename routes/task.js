import express from "express";
import {
  addNewTask,
  deleteTask,
  getMyTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const taskRouter = express.Router();

taskRouter.post("/new", isAuthenticated, addNewTask);

taskRouter.get("/mytask", isAuthenticated, getMyTask);

taskRouter
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);
