import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    targetMonthlyCo2Kg: { type: Number, required: true },
    startMonth: { type: Date, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Goal', goalSchema);