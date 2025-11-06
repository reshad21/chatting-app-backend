import { z } from "zod";

const ReviewValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required.' }),
        feedback: z.string({ required_error: 'Feedback is required' }),
        rating: z.number({ required_error: 'Rating is required' }),
    }),
});

export const ReviewValidation = {
    ReviewValidationSchema
}