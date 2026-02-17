import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorization.middleware";

const router = Router();

router.use(auth);

router.post("/", authorize(["admin"]), createUser);
router.get("/", authorize(["admin"]), getUsers);
router.get("/:id", authorize(["admin"]), getUser);
router.put("/:id", authorize(["admin"]), updateUser);
router.delete("/:id", authorize(["admin"]), deleteUser);

export default router;
