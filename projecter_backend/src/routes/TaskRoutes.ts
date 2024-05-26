import { Router } from "express";

import { authentication } from "@/utils";
import {
  getAllTasks,
  createTask,
  getOneTask,
  changeTaskStatus,
  getManyTasks,
  getUserCurrentTasks,
} from "@/controllers";

const router: Router = Router();

router.get("/getmanytasks", getManyTasks);
router.get("/getusertasks", getUserCurrentTasks);
router.get("/getall", [authentication], getAllTasks);
router.get("/getone/:id", [authentication], getOneTask);

router.post("/create", createTask);

router.put("/changetaskstatus/:id", changeTaskStatus);

export default router;
