import { Types } from "mongoose";

export type TBooking = {
    userId: Types.ObjectId;
    bikeId: Types.ObjectId;
    startTime: Date;
    returnTime: Date | null;
    totalCost: number;
    isReturned: boolean;
    payBill: boolean;
};