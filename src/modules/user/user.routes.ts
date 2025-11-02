
import { Router } from "express";
import UserController from "./user.controller";

const router = Router();

router.post("/signup", UserController.signUpUser);
router.post("/login", UserController.login);

export const UserRoutes = router;
