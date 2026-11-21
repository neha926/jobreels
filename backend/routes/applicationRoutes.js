import express from 'express';
import { getApplications, applyJob, updateApplicationStatus } from '../controllers/applicationController.js';

const router = express.Router();

router.get('/', getApplications);
router.post('/apply', applyJob);
router.put('/:id/status', updateApplicationStatus);

export default router;
