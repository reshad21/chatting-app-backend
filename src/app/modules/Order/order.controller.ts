import { Request, Response } from 'express';
import { orderService } from './order.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

export const createOrder = async (req: Request, res: Response) => {
    const orderData = req.body;
    const result = await orderService.createOrder(orderData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order is created succesfully',
        data: result,
    });
};


export const orderControllers = {
    createOrder,
};
