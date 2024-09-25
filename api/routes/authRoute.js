
import { signUp } from '../controllers/authController.js';
import User from '../models/userModel.js';
import express from 'express';

const router = express.Router();


router.post('/signup',signUp);


export default router;