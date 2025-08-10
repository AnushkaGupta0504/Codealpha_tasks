import { validationResult } from 'express-validator';
import Goal from '../models/Goal.js';

export async function getGoals(req, res, next) {
  try {
    const goals = await Goal.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    next(err);
  }
}

export async function createGoal(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { targetMonthlyCo2Kg, startMonth, note } = req.body;
    const goal = await Goal.create({
      userId: req.user.id,
      targetMonthlyCo2Kg,
      startMonth: new Date(startMonth),
      note: note || '',
    });
    res.status(201).json(goal);
  } catch (err) {
    next(err);
  }
}