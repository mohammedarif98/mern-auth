import express from 'express';
import { test,updateUserProfile,deleteUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router =  express.Router();
 

router.get('/userApi',test)
router.post('/update-profile/:id',verifyToken,updateUserProfile);
router.delete('/delete/:uid',verifyToken,deleteUser);

export default router;  