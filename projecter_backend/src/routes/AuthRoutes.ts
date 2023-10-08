import { Router } from "express";

import { signup, login } from "@/controllers/AuthController";

const router: Router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
