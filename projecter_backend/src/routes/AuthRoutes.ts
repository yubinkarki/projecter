import { Router } from "express";

import { signup, login } from "@/controllers";

const router: Router = Router();

router.post("/login", login);
router.post("/signup", signup);

export default router;
