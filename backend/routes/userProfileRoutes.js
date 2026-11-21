import express from 'express';
import { getUserProfile, saveUserProfile } from '../controllers/userProfileController.js';

const router = express.Router();

router.get('/:mobile', getUserProfile);
router.post('/save', saveUserProfile);

export default router;
