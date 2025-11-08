import mongoose, { Schema, Document } from 'mongoose';

export interface ICalculation extends Document {
  user: mongoose.Types.ObjectId;
  parentId: mongoose.Types.ObjectId | null;
  operation: string | null;
  rightNumber: number | null;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

const CalculationSchema: Schema = new Schema<ICalculation>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'Calculation', default: null },
  operation: { type: String, enum: ['+', '-', '*', '/'], default: null },
  rightNumber: { type: Number, default: null },
  value: { type: Number, required: true },
}, { timestamps: true });

const Calculation = mongoose.model<ICalculation>('Calculation', CalculationSchema);

export default Calculation;