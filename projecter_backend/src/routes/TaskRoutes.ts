import { Router } from "express";

import {
  getAllTasks,
  createTask,
  getOneTask,
  changeTaskStatus,
  getManyTasks,
  getUserCurrentTasks,
} from "@/controllers/TaskController";
import authentication from "@/utils/Auth";

const router: Router = Router();

router.post("/create", createTask);
router.get("/getmanytasks", getManyTasks);
router.get("/getusertasks", getUserCurrentTasks);
router.get("/getall", [authentication], getAllTasks);
router.put("/changetaskstatus/:id", changeTaskStatus);
router.get("/getone/:id", [authentication], getOneTask);

export default router;
