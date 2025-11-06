import { Types } from "mongoose";

export type TOrder = {
  userInfo: {
    fullName: string;
    address: string;
    phone: string;
    email: string;
    promoCode?: string; // Optional field
    paymentMethod?: 'stripe' | 'amerPay' | 'cash'; // Limited to these values
  };
  productInfo: {
    brand: string;
    name: string;
  };
  finalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled'; // Restrict status to these values
  paymentStatus: 'Pending' | 'Paid' | 'Failed'; // Restrict paymentStatus to these values
  transactionId: string;
  bookingID: Types.ObjectId;
};
