import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Review from './review.model';
import { Bike } from '../bike/bike.model';

const createReviewIntoDB = async (payload: any) => {
    const { bikeId } = payload;

    // Create the review
    const result = await Review.create(payload);

    // Add the review ID to the bike's reviews array
    await Bike.findByIdAndUpdate(
        bikeId,
        { $push: { reviews: result._id } }, // Use result._id to reference the created review
        { new: true, useFindAndModify: false }
    );

    return result;
};

export const ReviewServices = {
    createReviewIntoDB,
};
