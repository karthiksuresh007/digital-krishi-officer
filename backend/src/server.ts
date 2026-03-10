import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const port = 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
