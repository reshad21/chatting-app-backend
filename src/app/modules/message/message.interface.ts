import { Types } from "mongoose";

export interface IMessage {
  senderId: Types.ObjectId | string;
  receiverId: Types.ObjectId | string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}
