import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { ReviewControllers } from './review.controller';
import { ReviewValidation } from './review.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
    '',
    // auth(USER_ROLE.user),
    validateRequest(ReviewValidation.ReviewValidationSchema),
    ReviewControllers.createReview,
);

export const ReviewRoutes = router;
