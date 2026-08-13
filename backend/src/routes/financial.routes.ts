import { Router } from 'express';
import { financialController } from '../controllers/financial.controller';

const router = Router();

router.post('/viability', financialController.calculateViability);
router.post('/monthly-cost', financialController.calculateMonthlyCost);
router.post('/simulate', financialController.simulateScenario);
router.post('/convert', financialController.convertCurrency);
router.get('/exchange-rate/:from/:to', financialController.getExchangeRate);

export default router;