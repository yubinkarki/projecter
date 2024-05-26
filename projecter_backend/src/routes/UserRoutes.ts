import { Router } from "express";

import { authentication } from "@/utils";
import { getAllUsers, getOneUser, getOneUserById, updateUser, updateUserPassword } from "@/controllers";

const router: Router = Router();

router.get("/getall", getAllUsers);
router.get("/getoneuser/:id", getOneUserById);
router.get("/getone", [authentication], getOneUser);

router.put("/update", [authentication], updateUser);
router.put("/password/update", [authentication], updateUserPassword);

export default router;
