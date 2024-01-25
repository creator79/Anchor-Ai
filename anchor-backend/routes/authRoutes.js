import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOTP);

export default router;
