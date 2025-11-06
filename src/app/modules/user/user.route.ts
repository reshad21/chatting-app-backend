import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getProfile,
);

router.patch(
  '/me/:userId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateProfile,
);


router.get(
  '/all-users',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getAllUsers,
);

router.delete(
  '/:userId',
  auth(USER_ROLE.admin),
  UserControllers.deleteUser,
);

router.patch(
  '/role/:userId',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateStatus,
);

router.get(
  '/single-user/:userId',
  UserControllers.getSingleUser,
);


export const UserRoutes = router;
