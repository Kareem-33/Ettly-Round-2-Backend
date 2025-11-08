import { type Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const generateJWT = (userId: mongoose.Types.ObjectId, res: Response) => {
  const token = jwt.sign({userId}, JWT_SECRET, {expiresIn: '7d'});

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined
  });

  return token;
}