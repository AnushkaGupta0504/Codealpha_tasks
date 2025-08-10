import express from 'express';
import { body } from 'express-validator';
import { login, logout, register } from '../controllers/authController.js';

const router = express.Router();

router.post(
  '/register',
  [body('name').isString().isLength({ min: 2 }), body('email').isEmail(), body('password').isLength({ min: 6 })],
  register
);

router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 6 })], login);
router.post('/logout', logout);

export default router;