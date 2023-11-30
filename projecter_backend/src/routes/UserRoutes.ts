import { Router } from "express";

import { getAllUsers, getOneUser, getOneUserById, getManyUsers } from "@/controllers/UserController";
import { authentication } from "@/utils";

const router: Router = Router();

router.get("/getall", getAllUsers);
router.get("/getmany", getManyUsers);
router.get("/getoneuser/:id", getOneUserById);
router.get("/getone", [authentication], getOneUser);

export default router;
