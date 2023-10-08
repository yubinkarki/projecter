import { Router } from "express";

import {
  addProject,
  updateProject,
  deleteProject,
  getOneProject,
  getAllProjects,
  addProjectMember,
  getManyProjects,
} from "@/controllers/ProjectController";

const router: Router = Router();

router.post("/add", addProject);
router.get("/get/:id", getOneProject);
router.get("/getall", getAllProjects);
router.get("/getmany", getManyProjects);
router.put("/update/:id", updateProject);
router.post("/addmember", addProjectMember);
router.delete("/delete/:id", deleteProject);

export default router;
