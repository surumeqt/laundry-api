import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

// database connection
import MongoDBConnect from "./config/db.js";

// routes import
import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import orderRoutes from './routes/OrderRoutes.js'

// middlewares import
import { errorHandler, notFound } from './middlewares/ErrorMiddleware.js';

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors({
  origin: 'https://regal-selkie-94d772.netlify.app',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

MongoDBConnect(MONGO_URL);

// test

app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// uses

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});