import { z } from 'zod';

const rentValidationSchema = z.object({
    body: z.object({
        userId: z.string().min(1, "User ID is required").optional(),
        bikeId: z.string().min(1, "Bike ID is required"),
        startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid startTime",
        }),
        returnTime: z.union([
            z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: "Invalid returnTime",
            }),
            z.null(),
        ]).optional(),
        totalCost: z.number().positive().optional(),
        isReturned: z.boolean().default(false),
        payBill: z.boolean().default(false),
    }),
});

export const RentValidation = {
    rentValidationSchema,
};
