import express from 'express';
import { getReelsFeed, createReel, likeReel } from '../controllers/reelController.js';

const router = express.Router();

router.get('/', getReelsFeed);
router.post('/', createReel);
router.post('/:id/like', likeReel);

export default router;
