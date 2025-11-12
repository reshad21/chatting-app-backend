import { Conversation } from './conveersation.model';

const createConversation = async (participantIds: string[]) => {
  const existing = await Conversation.findOne({
    participants: { $all: participantIds, $size: participantIds.length },
  });

  if (existing) return existing;

  const conversation = await Conversation.create({
    participants: participantIds,
  });
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