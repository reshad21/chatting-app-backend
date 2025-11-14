import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { MessageService } from './message.service';

export const send = catchAsync(async (req, res) => {
  const senderId = req.user?.userId as string;
  // console.log("see sender id==>",req.user);
  const { receiverId, message, replyTo } = req.body;

  const result = await MessageService.sendMessage(
    senderId,
    receiverId,
    message,
    replyTo || null
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Send message successfully',
    data: result,
  });
});

export const get = catchAsync(async (req, res) => {
  const { conversationId } = req.params;
  const result = await MessageService.getMessages(conversationId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Messages retrieved successfully',
    data: result,
  });
});

export const messageController = {
  send,
  get,
};
