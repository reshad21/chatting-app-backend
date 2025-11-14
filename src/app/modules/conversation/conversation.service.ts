import { Conversation } from './conveersation.model';
import { Types } from 'mongoose';

const createConversation = async (participantIds: string[]) => {
  // Ensure participantIds is not empty
  if (!participantIds || participantIds.length === 0) {
    throw new Error("At least one participant is required to create a conversation.");
  }

  // Try to find existing conversation
  const existing = await Conversation.findOne({
    participants: { $all: participantIds },
    $expr: { $eq: [{ $size: "$participants" }, participantIds.length] }, // exact match
  });

  if (existing) return existing;

  // Create new conversation
  const conversation = await Conversation.create({
    participants: participantIds,
    message: [], // ensure message array exists
  });
  // Extra safety: double-check participants exist
  if (!conversation.participants || conversation.participants.length === 0) {
    // convert string ids to ObjectId instances
    conversation.participants = participantIds.map(id => new Types.ObjectId(id));
    await conversation.save();
  }

  return conversation;
};

const getConversations = async (userId: string) => {
  return await Conversation.find({
    participants: { $in: [userId] },
  })
    .populate('participants', 'name email')
    .populate('message');
};


export const ConversationService = {
  createConversation,
  getConversations,
};