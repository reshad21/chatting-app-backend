/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import { User } from '../user/user.model';
import Booking from './rent.model';

const createBookingIntoDB = async (payload: any, userInfo: any) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the user based on email and phone
    const getUserAllinfo = await User.findOne({
      email: userInfo?.email,
      phone: userInfo?.phone,
    }).session(session);

    if (!getUserAllinfo) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found for booking the bike!");
    }

    const userId = getUserAllinfo._id;

    // Find the bike by ID
    const bike = await Bike.findById(payload.bikeId).session(session);
    if (!bike) {
      throw new AppError(httpStatus.NOT_FOUND, "Bike not found for booking!");
    }

    if (!bike.isAvailable) {
      throw new AppError(httpStatus.BAD_REQUEST, "Bike is already booked!");
    }

    // Set the bike as unavailable
    await Bike.findByIdAndUpdate(payload.bikeId, { isAvailable: false }, { session });

    // Create the booking and destructure the first element from the array
    const [booking] = await Booking.create(
      [
        {
          userId,
          bikeId: payload.bikeId,
          startTime: payload.startTime,
          returnTime: null,
          totalCost: payload.totalCost || 0,
          isReturned: false,
          payBill: false,
        },
      ],
      { session }
    );

    // Populate all information for user and bike
    const populatedBooking = await Booking.findById(booking._id)
      .populate({
        path: "bikeId",
        select: "name brand cc model pricePerHour year", // Select only the fields you need
      })
      .populate({
        path: "userId",
        select: "name email", // Similarly, populate user details
      })
      .session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Debugging: Check if population works
    console.log("Populated Booking:", populatedBooking);

    return populatedBooking;
  } catch (error) {
    // Rollback transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};







const returnBikeFromUser = async (bookingId: string) => {
  // Find the rental record based on bikeId
  const rental = await Booking.findById(bookingId);

  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found!");
  }

  // Check if the bike is already returned
  if (rental.isReturned) {
    throw new AppError(httpStatus.FORBIDDEN, "Bike is already returned!");
  }

  // Calculate the rental duration and total cost
  const returnTime = new Date();
  const startTime = new Date(rental.startTime);

  // Ensure startTime is not in the future
  if (startTime > returnTime) {
    throw new AppError(httpStatus.BAD_REQUEST, "Start time cannot be in the future.");
  }

  const durationInHours = Math.ceil((returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));

  const bike = await Bike.findById(rental.bikeId);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike not found!");
  }

  const totalCost = durationInHours * bike.pricePerHour;

  // Update the rental record
  rental.returnTime = returnTime;
  rental.totalCost = totalCost;
  rental.isReturned = true;
  await rental.save();

  // Update the bike's availability status
  bike.isAvailable = true;
  await bike.save();

  return rental;
};


const getMyRentsBike = async (payload: any) => {
  // Find the user based on email and phone
  const getUserAllinfo = await User.findOne({
    email: payload?.email,
    phone: payload?.phone,
  });

  if (!getUserAllinfo) {
    throw new AppError(httpStatus.NOT_FOUND, "Dont get user for bookking bike !")
  }

  const userId = getUserAllinfo?._id;

  // Find all rentals for the user
  const rentals = await Booking.find({ userId }).populate({
    path: "bikeId",
    select: "name brand cc model pricePerHour year image", // Select only the fields you need
  }).populate({
    path: "userId",
    select: "name email", // Similarly, populate user details
  });

  return rentals;
}

const getAllRentBikes = async () => {
  // Find all rentals
  const rentals = await Booking.find().populate({
    path: "bikeId",
    select: "name brand cc model pricePerHour year image", // Select only the fields you need
  }).populate({
    path: "userId",
    select: "name email", // Similarly, populate user details
  });

  return rentals;
}


const getReturnedRentBikesFromBB = async (id: any) => {
  // Find all rentals
  const rentals = await Booking.findById(id).populate({
    path: "bikeId",
    select: "name brand cc model pricePerHour year image", // Select only the fields you need
  }).populate({
    path: "userId",
    select: "name email", // Similarly, populate user details
  });

  return rentals;
}


const updateRentPayBillStatusDB = async (payload: any, id: string) => {
  console.log("Updating Booking ID:", id);
  console.log("Payload:", payload);

  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  console.log("Update result:", result);

  return result;
}




export const BookingServices = {
  createBookingIntoDB,
  returnBikeFromUser,
  getMyRentsBike,
  getAllRentBikes,
  getReturnedRentBikesFromBB,
  updateRentPayBillStatusDB
};
