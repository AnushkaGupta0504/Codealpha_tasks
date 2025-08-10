import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import activityRoutes from './routes/activities.js';
import recommendationRoutes from './routes/recommendations.js';
import goalRoutes from './routes/goals.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandlers.js';

const app = express();

const allowedOrigin = process.env.CLIENT_ORIGIN || true;
app.use(helmet());
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/activities', activityRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/goals', goalRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;