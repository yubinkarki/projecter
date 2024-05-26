import { Router } from "express";

import {
  addProject,
  updateProject,
  deleteProject,
  getOneProject,
  getAllProjects,
  addProjectMember,
  getManyProjects,
} from "@/controllers";

const router: Router = Router();

router.get("/get/:id", getOneProject);
router.get("/getall", getAllProjects);
router.get("/getmany", getManyProjects);

router.post("/add", addProject);
router.post("/addmember", addProjectMember);

router.put("/update/:id", updateProject);

router.delete("/delete/:id", deleteProject);

export default router;
