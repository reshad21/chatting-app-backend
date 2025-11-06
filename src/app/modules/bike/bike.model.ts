/* eslint-disable @typescript-eslint/no-this-alias */
import httpStatus from "http-status";
import { model, Schema } from "mongoose";
import AppError from "../../errors/AppError";
import { TBike } from "./bike.interface";

const bikeSchema = new Schema<TBike>(
    {
        // user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: [true, 'uid is required'] },
        name: { type: String, required: true },
        description: { type: String, required: true },
        pricePerHour: { type: Number, required: true },
        isAvailable: { type: Boolean, default: true },
        isReturned: { type: Boolean, default: true },
        cc: { type: Number, required: true },
        year: { type: Number, required: true },
        model: { type: String, required: true },
        brand: { type: String, required: true },
        image: { type: String, required: true },
        reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    },
    {
        timestamps: true,
    },
);


// Pre-save hook to check for duplicate bike (based on name, model, and year)
// bikeSchema.pre('save', async function (next) {
//     const bike = this;

//     // Check if a bike with the same name, model, and year already exists
//     const existingBike = await Bike.findById(bike._id);

//     if (existingBike) {
//         throw new AppError(httpStatus.FOUND, "Bike is already save in the database !")
//     }

//     next();
// });



// Pre-update hook to check if the document exists before updating
bikeSchema.pre('findOneAndUpdate', async function (next) {
    // Get the query used for the update
    const query = this.getQuery();

    // Check if the document exists
    const bike = await Bike.findOne(query);

    if (!bike) {
        throw new AppError(httpStatus.NOT_FOUND, "Bike not found. Cannot update a non-existent document.")
    }

    next();
});


// Pre-delete hook to check if the document exists before deleting
bikeSchema.pre('findOneAndDelete', async function (next) {
    const query = this.getQuery();

    // Check if the document exists
    const bike = await Bike.findOne(query);

    if (!bike) {
        throw new AppError(httpStatus.NOT_FOUND, "Bike not found. Cannot delete a non-existent document.");
    }

    next();
});


export const Bike = model<TBike>('Bike', bikeSchema);