import { pick } from "lodash";

import {
  create,
  find,
  findById as findTaskById,
  findByIdAndUpdate,
} from "../models/TaskModel";
import { findById as findProjectById } from "../models/ProjectModel";

// Create task.
export async function createTask(req, res) {
  try {
    const task = await create(
      pick(req.body, ["taskName", "taskDeadline", "taskOwner", "taskProject"])
    );

    return res
      .status(200)
      .json({ status: true, msg: "Task created successfully", task });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, msg: "Could not create task" });
  }
}

// Get all tasks - admin.
export async function getAllTasks(req, res) {
  try {
    let condition = {};
    let tasks = [];
    const { id } = req.user;
    // const role = UserModel.findById(id).populate({ path: "role" });

    if (role == "user" || role == "pm") {
      tasks = await find({ taskOwner: id, ...condition });
    } else {
      tasks = await find({ condition });
    }

    if (tasks.length > 0) {
      return res
        .status(200)
        .json({ status: true, msg: "Tasks for this user are...", tasks });
    } else {
      return res
        .status(400)
        .json({ status: false, msg: "No tasks found in the database" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Error getting all tasks" });
  }
}

// Get one task by it's id.
export async function getOneTask(req, res) {
  try {
    const task = await findTaskById(req.params.id);

    if (!task)
      return res.status(400).json({ noTask: true, msg: "No tasks found" });
    return res
      .status(200)
      .json({ status: true, msg: "Here is the task", task });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error getting task" });
  }
}

// Change task status - by user.
export async function changeTaskStatus(req, res) {
  try {
    const { status } = req.body;

    const changedStatus = await findByIdAndUpdate(
      req.params.id,
      { taskStatus: status },
      { new: true }
    );

    if (!changedStatus)
      return res
        .status(404)
        .json({ status: false, msg: "Failed to update task status" });

    return res
      .status(200)
      .json({ status: true, msg: "Task status changed sucessfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, msg: "Error changing task status" });
  }
}

// Get task id array by user's current project id.
export async function getUserCurrentTasks(req, res) {
  try {
    const userCurrentTasks = await findProjectById(req.query.projectId).then(
      (res) => res.projectTasks
    );

    const currentTaskId = [];

    userCurrentTasks.map((item) => {
      currentTaskId.push(item.valueOf());
    });

    return res.status(200).json({
      status: true,
      msg: "Project tasks found successfully",
      currentTaskId,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: false, msg: "Error getting tasks id" });
  }
}

// Get many task details by task id.
export async function getManyTasks(req, res) {
  const projectTasksId = req.query.taskId;

  try {
    const manyTasks = await find({
      _id: {
        $in: projectTasksId,
      },
    });

    return res
      .status(200)
      .json({ status: true, msg: "Tasks found successfully", manyTasks });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error getting tasks" });
  }
}
