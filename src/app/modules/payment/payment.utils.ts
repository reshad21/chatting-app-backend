import axios from "axios";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";

export const initiatePayment = async (paymentData: any) => {
    try {
        const response = await axios.post(config.payment_url as string, {
            store_id: config.store_id,
            signature_key: config.signature_key,
            tran_id: paymentData.transactionId,
            success_url: `https://bike-booking-opal.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
            fail_url: `https://bike-booking-opal.vercel.app/api/payment/confirmation?status=failed`,
            cancel_url: "https://bike-rental-website.vercel.app",
            amount: "10.0",
            currency: "BDT",
            desc: "Merchant Registration Payment",
            cus_name: paymentData.customerName,
            cus_email: paymentData.customerEmail,
            cus_add1: paymentData.customerAddress,
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_state: "N/A",
            cus_postcode: "N/A",
            cus_country: "N/A",
            cus_phone: paymentData.customerPhone,
            type: "json"
        });

        // console.log(response);
        return response.data;
    } catch (error) {
        throw new AppError(httpStatus.FORBIDDEN, "Payment initiation failed!")
    }
}


export const verifyPayment = async (tnxId: string) => {
    try {
        const response = await axios.get(config.payment_verify_url!, {
            params: {
                store_id: config.store_id,
                signature_key: config.signature_key,
                type: "json",
                request_id: tnxId
            }
        });

        return response.data;
    } catch (error) {
        throw new AppError(httpStatus.FORBIDDEN, "Payment validation failed!")
    }

}