import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';

import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

// parsers
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://book-store-client-as4-1l9r.vercel.app',
      'https://stellar-crisp-4109b2.netlify.app'
    ],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use('/api', router);

//Not Found

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! From Blog with build');
});
app.use(globalErrorHandler);

app.use(notFound);
export default app;
