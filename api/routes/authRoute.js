
import { signUp,signIn } from '../controllers/authController.js';
import User from '../models/userModel.js';
import express from 'express';

const router = express.Router();


router.post('/signup',signUp);
router.post('/signin',signIn)


export default router;