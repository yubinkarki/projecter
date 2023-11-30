import { Router } from "express";

import { authentication } from "@/utils";
import { signup, login, deleteOneUser, updateUser, updatePassword } from "@/controllers/AuthController";

const router: Router = Router();

router.post("/login", login);
router.post("/signup", signup);

router.delete("/delete/:id", deleteOneUser);

router.put("/update", [authentication], updateUser);
router.put("/password/update", [authentication], updatePassword);

export default router;
