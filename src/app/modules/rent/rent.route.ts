import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { RentControllers } from './rent.controller';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.user),
    // validateRequest(RentValidation.rentValidationSchema),
    RentControllers.createRent,
);

router.put(
    '/:id/return',
    auth(USER_ROLE.admin),
    RentControllers.returnBike
)

router.get(
    "/",
    auth(USER_ROLE.admin, USER_ROLE.user),
    RentControllers.getRentBike
)

router.get(
    "/allRent",
    auth(USER_ROLE.admin),
    RentControllers.getAllRentBikes
)

router.get(
    "/return/:rentId",
    // auth(USER_ROLE.admin),
    RentControllers.getSingleReturnRentBikes
)

router.patch(
    '/return/:rentId',
    RentControllers.updatePayBillStatus
);

export const RentRoutes = router;
