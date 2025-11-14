import { Schema, model } from "mongoose";
import { IMessage } from "./message.interface";

const messageSchema = new Schema<IMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    // NEW FIELD
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

export const Message = model<IMessage>("Message", messageSchema);
