/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { TSubscription } from "./subscription.interface";

const subscriptionSchema = new Schema<TSubscription>(
    {
        email: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const Subscription = model<TSubscription>('Subscription', subscriptionSchema);

export default Subscription;
