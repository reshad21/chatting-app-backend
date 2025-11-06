import { Types } from "mongoose";

export type TReview = {
    userId: Types.ObjectId;
    bikeId: Types.ObjectId;
    name: string;
    feedback: string;
    rating: number;
};