import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ConversationService } from "./conversation.service";


const createConversation = catchAsync(async (req, res) => {
  const { participants } = req.body;
    const result = await ConversationService.createConversation(participants);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Conversation created successfully',
        data: result,
    });
});




const getMyConversations = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await ConversationService.getConversations(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Conversations retrieved successfully',
    data: result,
  });
});

export const ConversationController = {
  createConversation,
  getMyConversations,
};
