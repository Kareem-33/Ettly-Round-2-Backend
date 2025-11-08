import express from 'express';
// import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './config/db.js';
import userRouter from './modules/user/user.routes.js';
import calculationRouter from './modules/calculation/calculation.routes.js';

// dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use("/api/user", userRouter);
app.use("/api/calculation", calculationRouter);

const PORT = process.env.PORT || 4444;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}: http://localhost:${PORT}`));
});