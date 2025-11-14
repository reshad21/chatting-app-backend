import { Conversation } from "../conversation/conveersation.model";
import { Message } from "./message.model";
import { Types } from "mongoose";

const sendMessage = async (
  senderId: string,
  receiverId: string,
  message: string,
  replyTo: string | null
) => {

  // 1. Find existing conversation
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] }
  });

  // 2. Create conversation if not exist
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
      message: []
    });
  }

  // 3. Create message (with replyTo)
  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
    replyTo: replyTo ? replyTo : null
  });

  // 4. Push message into conversation
  conversation.message.push(newMessage._id);
  await conversation.save();

  return newMessage;
};



const getMessages = async (conversationId: string) => {
  return await Conversation.findById(conversationId).populate({
    path: "message",
    populate: { path: "senderId", select: "name email" },
  });
};


export const MessageService = {
  sendMessage,
  getMessages,
};