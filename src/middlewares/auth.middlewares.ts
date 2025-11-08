import type { NextFunction, Response } from "express";
import { ExtendedRequest } from "../modules/user/user.controller.js";
// import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User, { type IUser } from "../modules/user/user.model.js";
import mongoose from "mongoose";

// dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const protectRoute = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if(!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - Token not provided" });
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: mongoose.Types.ObjectId };
    if(!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized - Invalid or expired token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if(!user) {
      return res.status(404).json({ success: false, message: "Unauthorized - User not found" });
    }
    req.user = user as unknown as IUser;
    next();
  } catch (error) {
    console.log(`Error in protectRouter middleware: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}