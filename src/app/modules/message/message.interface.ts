import { Types } from "mongoose";

export interface IMessage {
  senderId: Types.ObjectId | string;
  receiverId: Types.ObjectId | string;
  message: string;
  replyTo?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}
