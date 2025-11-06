/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";
import { User } from "../user/user.model";

const reviewSchema = new Schema<TReview>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
        name: { type: String, required: true },
        feedback: { type: String, required: true },
        rating: { type: Number, required: true },
    },
    {
        timestamps: true,
    },
);

// Pre-save hook to check if the User exists before creating a booking
reviewSchema.pre('save', async function (next) {
    const user = this;

    const userExists = await User.findById(user.userId);

    if (!userExists) {
        const error = new Error('User not found. Cannot create a user for a non-existent User.');
        return next(error);
    }

    next();
});

const Review = model<TReview>('Review', reviewSchema);

export default Review;
