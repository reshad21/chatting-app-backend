import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { BikeControllers } from './bike.controller';
import { BikeValidation } from './bike.validation';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    validateRequest(BikeValidation.createBikeValidationSchema),
    BikeControllers.createBike,
);

router.get(
    '/',
    BikeControllers.getAllBike
);

router.get(
    '/:bikeId',
    BikeControllers.getSingleBike
);

router.patch(
    '/:bikeId',
    auth(USER_ROLE.admin),
    validateRequest(BikeValidation.updateBikeValidationSchema),
    BikeControllers.updateBike
);

router.delete(
    '/:bikeId',
    auth(USER_ROLE.admin),
    validateRequest(BikeValidation.updateBikeValidationSchema),
    BikeControllers.deleteBike
);

export const BikeRoutes = router;
