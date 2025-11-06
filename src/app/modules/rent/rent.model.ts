/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { Bike } from "../bike/bike.model";
import { TBooking } from "./rent.interface";

const bookingSchema = new Schema<TBooking>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
        startTime: { type: Date, required: true },
        returnTime: { type: Date, default: null }, // Allow returnTime to be null
        totalCost: { type: Number, required: true },
        isReturned: { type: Boolean, default: false },
        payBill: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

// Pre-save hook to check if the bike exists before creating a booking
bookingSchema.pre('save', async function (next) {
    const booking = this;

    // Check if the bike with the given bikeId exists in the Bike collection
    const bikeExists = await Bike.findById(booking.bikeId);

    if (!bikeExists) {
        const error = new Error('Bike not found. Cannot create a booking for a non-existent bike.');
        return next(error);
    }

    next();
});

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;
