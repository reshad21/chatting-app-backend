import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ConversationController } from "./conversation.controller";

const router = express.Router();

router.post("/", auth(USER_ROLE.admin, USER_ROLE.user), ConversationController.createConversation);
router.get("/", auth(USER_ROLE.admin, USER_ROLE.user), ConversationController.getMyConversations);


export const ConversationRoutes = router;
