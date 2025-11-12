import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { Message } from '../message/message.model';

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
      },
    ],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Message,
        required: true,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Conversation = mongoose.model('Conversation', conversationSchema);
