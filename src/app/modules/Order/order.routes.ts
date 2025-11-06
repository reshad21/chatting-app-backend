import express from 'express';
import { orderControllers } from './order.controller';

const router = express.Router();

router.post(
    '/create',
    orderControllers.createOrder,
);



export const OrderRoutes = router;
