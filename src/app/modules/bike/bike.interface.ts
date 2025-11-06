import { Types } from "mongoose";

export type TBike = {
    // user: Types.ObjectId;
    name: string;
    description: string;
    pricePerHour: number;
    isAvailable: boolean;
    isReturned: boolean;
    cc: number;
    year: number;
    model: string;
    brand: string;
    image: string;
    reviews: Types.ObjectId[];
};
