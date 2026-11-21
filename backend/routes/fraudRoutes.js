import express from 'express';
import { getFraudReports, submitReport, resolveReport } from '../controllers/fraudController.js';

const router = express.Router();

router.get('/', getFraudReports);
router.post('/report', submitReport);
router.put('/:id/resolve', resolveReport);

export default router;
