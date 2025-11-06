import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getProfile = catchAsync(async (req, res) => {
  const data = req.user;
  const result = await UserServices.getProfilefromDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersfromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived All Users',
    data: result,
  });
});


const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const result = await UserServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});


const updateStatus = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const data = req.user;
  const result = await UserServices.updateStatusFromDB(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});


const updateProfile = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const data = req.body; /** use it carefully */
  // console.log(data);
  const result = await UserServices.updateProfilefromDB(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const result = await UserServices.getSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrived successfully',
    data: result,
  });
});

export const UserControllers = {
  // createUser,
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
  updateStatus,
  getSingleUser
};
