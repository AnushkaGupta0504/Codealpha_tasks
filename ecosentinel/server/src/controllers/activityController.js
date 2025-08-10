import { validationResult } from 'express-validator';
import Activity from '../models/Activity.js';
import { computeActivityEmissions } from '../utils/emissions.js';
import User from '../models/User.js';

export async function listActivities(req, res, next) {
  try {
    const items = await Activity.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createActivity(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { category, type, quantity, unit, date, details } = req.body;
    const co2Kg = computeActivityEmissions(category, type, quantity, unit, details);
    const activity = await Activity.create({
      userId: req.user.id,
      category,
      type,
      quantity,
      unit,
      date: date ? new Date(date) : new Date(),
      details: details || {},
      co2Kg,
    });

    await checkAndAwardBadges(req.user.id);

    res.status(201).json(activity);
  } catch (err) {
    next(err);
  }
}

export async function updateActivity(req, res, next) {
  try {
    const { id } = req.params;
    const activity = await Activity.findOne({ _id: id, userId: req.user.id });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });

    const { category, type, quantity, unit, date, details } = req.body;
    if (category) activity.category = category;
    if (type) activity.type = type;
    if (quantity !== undefined) activity.quantity = quantity;
    if (unit) activity.unit = unit;
    if (date) activity.date = new Date(date);
    if (details) activity.details = details;
    activity.co2Kg = computeActivityEmissions(
      activity.category,
      activity.type,
      activity.quantity,
      activity.unit,
      activity.details
    );

    await activity.save();
    res.json(activity);
  } catch (err) {
    next(err);
  }
}

export async function deleteActivity(req, res, next) {
  try {
    const { id } = req.params;
    const activity = await Activity.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

async function checkAndAwardBadges(userId) {
  const user = await User.findById(userId);
  if (!user) return;

  const badges = new Set(user.achievements.map((a) => a.code));

  // Badge: first_log
  if (!badges.has('first_log')) {
    const count = await Activity.countDocuments({ userId });
    if (count >= 1) {
      user.achievements.push({ code: 'first_log', name: 'First Step: Logged your first activity' });
    }
  }

  // Badge: five_days_streak (rough: activities on 5 distinct recent days)
  if (!badges.has('five_days_streak')) {
    const last7 = await Activity.find({ userId })
      .sort({ date: -1 })
      .limit(100);
    const days = new Set(last7.map((a) => new Date(a.date).toDateString()));
    if (days.size >= 5) {
      user.achievements.push({ code: 'five_days_streak', name: 'On a Roll: 5-day activity streak' });
    }
  }

  await user.save();
}