import express from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { createGoal, getGoals } from '../controllers/goalController.js';

const router = express.Router();
router.use(requireAuth);
router.get('/', getGoals);
router.post('/', [body('targetMonthlyCo2Kg').isFloat({ gt: 0 }), body('startMonth').isISO8601()], createGoal);
export default router;