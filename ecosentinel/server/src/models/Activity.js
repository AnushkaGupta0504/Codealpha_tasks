import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    date: { type: Date, required: true },
    category: {
      type: String,
      enum: ['transportation', 'energy', 'food', 'waste'],
      required: true,
    },
    type: { type: String, required: true },
    details: { type: Object },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    co2Kg: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Activity', activitySchema);