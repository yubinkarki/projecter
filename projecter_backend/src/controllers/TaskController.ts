import { Response, Request } from "express";

import { TaskModel, projectModel } from "@/models";

// Create a task.
export async function createTask(req: Request, res: Response) {
  try {
    const task = await TaskModel.create(req.body);

    return res.status(200).json({ status: true, msg: "Task created successfully", task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, msg: "Could not create task" });
  }
}

// Get all tasks - admin.
export async function getAllTasks(_: Request, res: Response) {
  try {
    let condition = {};
    let tasks = [];
    // const { id } = req.user;
    // const role = UserModel.findById(req.params.id).populate({ path: "role" });

    // if (role == "user" || role == "pm") {
    //   tasks = await TaskModel.find({ taskOwner: req.params.id, ...condition });
    // } else {
    //   tasks = await TaskModel.find({ condition });
    // }

    tasks = await TaskModel.find({ condition });

    if (tasks.length > 0) {
      return res.status(200).json({ status: true, msg: "Tasks for this user are...", tasks });
    } else {
      return res.status(400).json({ status: false, msg: "No tasks found in the database" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error getting all tasks" });
  }
}

// Get one task by it's id.
export async function getOneTask(req: Request, res: Response) {
  try {
    const task = await TaskModel.findById(req.params.id);

    if (!task) return res.status(400).json({ noTask: true, msg: "No tasks found" });
    return res.status(200).json({ status: true, msg: "Here is the task", task });
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Error getting task" });
  }
}

// Change task status - by user.
export async function changeTaskStatus(req: Request, res: Response) {
  try {
    const { status } = req.body;

    const changedStatus = await TaskModel.findByIdAndUpdate(req.params.id, { taskStatus: status }, { new: true });

    if (!changedStatus) return res.status(404).json({ status: false, msg: "Failed to update task status" });

    return res.status(200).json({ status: true, msg: "Task status changed successfully" });
  } catch (error) {
    return res.status(400).json({ status: false, msg: "Error changing task status" });
  }
}

// Get task id array by user's current project id.
export async function getUserCurrentTasks(req: Request, res: Response) {
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
}

// Get many task details by task id.
export async function getManyTasks(req: Request, res: Response) {
  const projectTasksId = req.query.taskId;

  try {
    const manyTasks = await TaskModel.find({
      _id: {
        $in: projectTasksId,
      },
    });

    return res.status(200).json({ status: true, msg: "Tasks found successfully", manyTasks });
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Error getting tasks" });
  }
}
