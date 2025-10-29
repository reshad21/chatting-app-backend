import { Router } from "express";
import UserController from "./user.controller";
const router = Router();
router.post("/signup", UserController.signUpUser);
export const UserRoutes = router;
