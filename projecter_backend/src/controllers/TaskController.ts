const _ = require("lodash");
import { Response, Request } from "express";

import { taskModel, projectModel, userModel } from "@/models";

// Create task.
export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskModel.create(_.pick(req.body, ["taskName", "taskDeadline", "taskOwner", "taskProject"]));

    return res.status(200).json({ status: true, msg: "Task created successfully", task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, msg: "Could not create task" });
  }
};

// Get all tasks - admin.
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    let condition = {};
    let tasks = [];
    // const { id } = req.user;
    // const role = userModel.findById(req.params.id).populate({ path: "role" });

    // if (role == "user" || role == "pm") {
    //   tasks = await taskModel.find({ taskOwner: req.params.id, ...condition });
    // } else {
    //   tasks = await taskModel.find({ condition });
    // }

    tasks = await taskModel.find({ condition });

    if (tasks.length > 0) {
      return res.status(200).json({ status: true, msg: "Tasks for this user are...", tasks });
    } else {
      return res.status(400).json({ status: false, msg: "No tasks found in the database" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error getting all tasks" });
  }
};

// Get one task by it's id.
export const getOneTask = async (req: Request, res: Response) => {
  try {
    const task = await taskModel.findById(req.params.id);

    if (!task) return res.status(400).json({ noTask: true, msg: "No tasks found" });
    return res.status(200).json({ status: true, msg: "Here is the task", task });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error getting task" });
  }
};

// Change task status - by user.
export const changeTaskStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const changedStatus = await taskModel.findByIdAndUpdate(req.params.id, { taskStatus: status }, { new: true });

    if (!changedStatus) return res.status(404).json({ status: false, msg: "Failed to update task status" });

    return res.status(200).json({ status: true, msg: "Task status changed successfully" });
  } catch (error) {
    return res.status(400).json({ status: false, msg: "Error changing task status" });
  }
};

// Get task id array by user's current project id.
export const getUserCurrentTasks = async (req: Request, res: Response) => {
  try {
    const userCurrentTasks = await projectModel.findById(req.query.projectId).then((res) => res?.projectTasks);

    const currentTaskId: any = [];

    userCurrentTasks?.map((item) => {
      currentTaskId.push(item.valueOf());
    });

    return res.status(200).json({
      status: true,
      msg: "Project tasks found successfully",
      currentTaskId,
    });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error getting tasks id" });
  }
};

// Get many task details by task id.
export const getManyTasks = async (req: Request, res: Response) => {
  const projectTasksId = req.query.taskId;

  try {
    const manyTasks = await taskModel.find({
      _id: {
        $in: projectTasksId,
      },
    });

    return res.status(200).json({ status: true, msg: "Tasks found successfully", manyTasks });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error getting tasks" });
  }
};
