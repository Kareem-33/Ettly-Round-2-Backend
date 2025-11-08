import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import User, { IUser } from "./user.model.js";
import { generateJWT } from "../../utils/generateJWT.js";
import mongoose from "mongoose";

export interface ExtendedRequest extends Request {
  user?: IUser;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
      return res.status(400).json({message: "All fields are required"});
    }
    const existingUser = await User.findOne({ $or: [{username}, {email}] });
    if(existingUser) {
      return res.status(409).json({message: "Username or email already in use"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = generateJWT(newUser._id as mongoose.Types.ObjectId, res);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { ...newUser.toObject(), password: undefined }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({message: "Internal server error"});
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
    if(!email || !password) {
      return res.status(400).json({message: "Email and password are required"});
    }
    const user = await User.findOne({email});
    if(!user) {
      return res.status(401).json({message: "Invalid email or password"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.status(401).json({message: "Invalid email or password"});
    }

    const token = generateJWT(user._id as mongoose.Types.ObjectId, res);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { ...user.toObject(), password: undefined }
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({message: "Internal server error"});
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined
    });
    return res.status(200).json({message: "User logged out successfully"});
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({message: "Internal server error"});
  }
}

export const getProfile = async (req: ExtendedRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: { ...user.toObject(), password: undefined }
    });
  } catch (error) {
    console.error("Error getting user profile:", error);
    return res.status(500).json({message: "Internal server error"});
  }
}