import type { Request, Response } from 'express';
import Calculation from './calculation.model.js';
import { ExtendedRequest } from '../user/user.controller.js';

export const getAllCalculations = async (req: Request, res: Response) => {
  try {
    const calculations = await Calculation.find()
      .sort({ createdAt: -1 })
      .populate({ path: 'user', select: 'username' })
      .populate({ path: 'parentId', select: 'value' });

    res.status(200).json({
      success: true,
      message: 'Calculations fetched successfully',
      data: calculations,
    });
  } catch (error) {
    console.error('Error getting all calculations:', error);
    res.status(500).json({ message: 'Internal Server error' });
  }
};

export const createCalculation = async (req: ExtendedRequest, res: Response) => {
  try {
    const { value } = req.body;
    const userId = req.user?._id;

    const newCalculation = new Calculation({
      user: userId,
      value: Number(value),
    });

    await newCalculation.save();

    res.status(201).json({
      success: true,
      message: 'Calculation created successfully',
      data: newCalculation,
    });
  } catch (error) {
    console.error('Error creating calculation:', error);
    res.status(500).json({ message: 'Internal Server error' });
  }
};

export const replyToCalculation = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { operation, rightNumber } = req.body;
    const user = req.user?._id;

    const parentCalculation = await Calculation.findById(id);
    if (!parentCalculation) {
      return res.status(404).json({ message: 'Parent calculation not found' });
    }

    const leftValue = Number(parentCalculation.value);
    const rightValue = Number(rightNumber);

    let newValue: number;

    switch (operation) {
      case '+':
        newValue = leftValue + rightValue;
        break;
      case '-':
        newValue = leftValue - rightValue;
        break;
      case '*':
        newValue = leftValue * rightValue;
        break;
      case '/':
        if (rightValue === 0) {
          return res.status(400).json({ message: 'Division by zero is not allowed' });
        }
        newValue = leftValue / rightValue;
        break;
      default:
        return res.status(400).json({ message: 'Invalid operation' });
    }

    const newCalculation = new Calculation({
      user,
      parentId: parentCalculation._id,
      value: newValue,
      operation,
      rightNumber: rightValue,
    });

    await newCalculation.save();

    res.status(201).json({
      success: true,
      message: 'Reply calculation created successfully',
      data: newCalculation,
    });
  } catch (error) {
    console.error('Error replying to calculation:', error);
    res.status(500).json({ message: 'Internal Server error' });
  }
};
