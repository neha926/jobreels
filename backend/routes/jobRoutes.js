import express from 'express';
import { getJobs, createJob, verifyJob } from '../controllers/jobController.js';

const router = express.Router();

router.get('/', getJobs);
router.post('/', createJob);
router.put('/:id/verify', verifyJob);

export default router;
