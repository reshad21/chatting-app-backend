import { Conversation } from "../conversation/conveersation.model";
import { Message } from "./message.model";

const sendMessage = async (senderId: string, receiverId: string, message: string) => {
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({ participants: [senderId, receiverId], message: [] });
  }

  const newMessage = await Message.create({ senderId, receiverId, message });

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