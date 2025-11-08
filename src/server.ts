import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./modules/user/user.routes.js";
import calculationRoutes from "./modules/calculation/calculation.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "https://ettly-round-2-frontend.netlify.app",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/calculation", calculationRoutes);

app.get("/", (_, res) => res.send("API is running"));

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connectDB();