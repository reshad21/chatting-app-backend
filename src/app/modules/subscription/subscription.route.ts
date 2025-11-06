import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { SubscriptionControllers } from './subscription.controller';
import { SubscriptionValidation } from './subscription.validation';

const router = express.Router();

router.post(
    '/',
    validateRequest(SubscriptionValidation.SubscriptionValidationSchema),
    SubscriptionControllers.createSubscription,
);

router.get(
    '/',
    SubscriptionControllers.getAllSubscription,
);

export const SubscriptionRoutes = router;
