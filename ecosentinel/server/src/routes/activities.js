import express from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { listActivities, createActivity, updateActivity, deleteActivity } from '../controllers/activityController.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', listActivities);
router.post(
  '/',
  [
    body('category').isIn(['transportation', 'energy', 'food', 'waste']),
    body('type').isString(),
    body('quantity').isFloat({ gt: -100000 }),
    body('unit').isString(),
    body('date').optional().isISO8601(),
  ],
  createActivity
);

router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);

export default router;