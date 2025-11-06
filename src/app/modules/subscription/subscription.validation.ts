import { z } from "zod";

const SubscriptionValidationSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: 'Email is required.' })
            .email({ message: 'Invalid email format.' })
            .min(3, { message: 'Email must be at least 5 characters long.' })
            .max(255, { message: 'Email must be no longer than 255 characters.' }),
    }),
});

export const SubscriptionValidation = {
    SubscriptionValidationSchema,
};
