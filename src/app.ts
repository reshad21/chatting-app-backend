/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();
app.use(express.static(path.join(__dirname, "../public/")))
//parsers
app.use(express.json());
// app.use(cors({ origin: 'https://bike-rental-website.vercel.app', credentials: true }));
app.use(
  cors({
    origin: ['https://bike-rental-website.vercel.app', 'http://localhost:5173'],
    credentials: true,
  })
);

// application routes
app.use('/api', router);



app.get('/', (req: Request, res: Response) => {
  res.send('App is running!')
})

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
