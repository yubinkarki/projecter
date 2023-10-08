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
import authentication from "@/utils/Auth";

const router: Router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/getall", getAllUsers);
router.get("/getmany", getManyUsers);
router.delete("/delete/:id", deleteOneUser);
router.get("/getoneuser/:id", getOneUserById);
router.get("/getone", [authentication], getOneUser);
router.put("/update", [authentication], updateUser);
router.put("/password/update", [authentication], updatePassword);

export default router;
