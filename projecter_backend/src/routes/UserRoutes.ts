import { Router } from "express";

import { getAllUsers, getOneUser, getOneUserById, updateUser, updatePassword } from "@/controllers/UserController";
import { authentication } from "@/utils";

const router: Router = Router();

router.get("/getall", getAllUsers);
router.get("/getoneuser/:id", getOneUserById);
router.get("/getone", [authentication], getOneUser);

router.put("/update", [authentication], updateUser);
router.put("/password/update", [authentication], updatePassword);

export default router;
