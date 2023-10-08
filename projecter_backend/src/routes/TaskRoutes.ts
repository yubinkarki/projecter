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

router.get("/getone/:id", [authentication], getOneTask);
router.get("/getall", [authentication], getAllTasks);
router.get("/getmanytasks", getManyTasks);
router.get("/getusertasks", getUserCurrentTasks);
router.post("/create", createTask);
router.put("/changetaskstatus/:id", changeTaskStatus);

export default router;
