import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './rent.service';

const createRent = catchAsync(async (req, res) => {
    const userInfo = req.user;
    const result = await BookingServices.createBookingIntoDB(req.body, userInfo);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental created successfully',
        data: result,
    });
});

const returnBike = catchAsync(async (req, res) => {
    const bookingId = req.params.id;
    // const userInfo = req.user;

    const result = await BookingServices.returnBikeFromUser(bookingId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bike returned successfully',
        data: result,
    });
});

const getRentBike = catchAsync(async (req, res) => {
    const userInfo = req.user;

    const result = await BookingServices.getMyRentsBike(userInfo);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rentals retrieved successfully',
        data: result,
    });
});


const getAllRentBikes = catchAsync(async (req, res) => {

    const result = await BookingServices.getAllRentBikes();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Rent retrieved successfully',
        data: result,
    });
});


const getSingleReturnRentBikes = catchAsync(async (req, res) => {
    const { rentId } = req.params;
    const result = await BookingServices.getReturnedRentBikesFromBB(rentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Rent retrieved successfully',
        data: result,
    });
});



const updatePayBillStatus = catchAsync(async (req, res) => {
    const id = req.params.rentId; // Make sure this is the correct identifier
    const data = req.body;

    console.log("Received ID:", id);
    console.log("Received data:", data);

    const result = await BookingServices.updateRentPayBillStatusDB(data, id);

    if (!result) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "Booking not found!",
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'PayBill Status updated successfully',
        data: result,
    });
});




export const RentControllers = {
    createRent,
    returnBike,
    getRentBike,
    getAllRentBikes,
    getSingleReturnRentBikes,
    updatePayBillStatus
};
