import express from 'express';
import { test,updateUserProfile } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router =  express.Router();
 

router.get('/userApi',test)
router.post('/update-profile/:id',verifyToken,updateUserProfile)

export default router;  