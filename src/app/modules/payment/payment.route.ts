import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();


router.post('/confirmation', paymentController.confirmationController)


export const paymentRoutes = router;
