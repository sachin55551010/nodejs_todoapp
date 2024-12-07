import { Task } from "../models/taskSchema.js";
import { ErrorHandler } from "../utils/errorhandler.js";

export const addNewTask = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    await Task.create({
      title,
      description,
      user: req.user,
    });
    res.status(201).json({ success: true, message: "Task added Successfully" });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res) => {
  const userId = req.user._id;

  try {
    const task = await Task.find({ user: userId });
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("No Task Found ! ", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res
      .status(201)
      .json({ success: true, Message: "Task updated Successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) next(new ErrorHandler("No Task Found ! ", 404));
    res
      .status(201)
      .json({ success: true, Message: "Task Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
