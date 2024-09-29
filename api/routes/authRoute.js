
import { signUp,signIn,googleAuth,signOut } from '../controllers/authController.js';
import User from '../models/userModel.js';
import express from 'express';

const router = express.Router();


router.post('/signup',signUp);
router.post('/signin',signIn)
router.post('/google',googleAuth)
router.get('/signout',signOut)


export default router;