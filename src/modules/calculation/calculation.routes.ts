import {Router} from 'express';
import { protectRoute } from '../../middlewares/auth.middlewares.js';
import { createCalculation, getAllCalculations, replyToCalculation } from './calculation.controller.js';

const router = Router();

router.get('/', getAllCalculations);
router.post('/', protectRoute, createCalculation);
router.post('/:id/reply', protectRoute, replyToCalculation);

export default router;