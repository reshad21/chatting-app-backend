import express from "express";
import * as MessageController from "./message.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/", auth(USER_ROLE.admin, USER_ROLE.user), MessageController.send);
router.get("/:conversationId", auth(USER_ROLE.admin, USER_ROLE.user), MessageController.get);


export const MessageRoutes = router;
