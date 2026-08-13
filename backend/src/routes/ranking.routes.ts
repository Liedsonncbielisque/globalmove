import { Router } from 'express';
import { rankingController } from '../controllers/ranking.controller';

const router = Router();

router.post('/calculate', rankingController.calculate);
router.get('/weights/:objective', rankingController.getWeights);

export default router;