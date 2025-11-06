import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubscriptionServices } from './subscription.service';


const createSubscription = catchAsync(async (req, res) => {
    const result = await SubscriptionServices.createSubscriptionIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subscription is created succesfully',
        data: result,
    });
});


const getAllSubscription = catchAsync(async (req, res) => {
    const result = await SubscriptionServices.getSubscriptionIntoDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subscription retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});



export const SubscriptionControllers = {
    createSubscription,
    getAllSubscription,
};

