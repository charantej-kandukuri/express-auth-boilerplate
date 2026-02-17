import { Router } from "express";
import { login, logout, me, refresh, register } from "./auth.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/me", auth, me);
router.post("/login", login);
router.post("/register", register);
router.post("/logout", auth, logout);
router.post("/refresh", refresh);

export default router;
