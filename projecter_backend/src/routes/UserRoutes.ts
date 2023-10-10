import { Router } from "express";

import {
  getAllUsers,
  signup,
  login,
  getOneUser,
  deleteOneUser,
  updateUser,
  updatePassword,
  getOneUserById,
  getManyUsers,
} from "@/controllers/UserController";
import { authentication } from "@/utils";

const router: Router = Router();

router.get("/getall", getAllUsers);
router.get("/getmany", getManyUsers);
router.get("/getoneuser/:id", getOneUserById);
router.get("/getone", [authentication], getOneUser);

router.post("/login", login);
router.post("/signup", signup);

router.put("/update", [authentication], updateUser);
router.put("/password/update", [authentication], updatePassword);

router.delete("/delete/:id", deleteOneUser);

export default router;
