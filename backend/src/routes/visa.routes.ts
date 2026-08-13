import { Router } from 'express';
import { visaController } from '../controllers/visa.controller';

const router = Router();

router.get('/country/:countryId', visaController.getByCountry);
router.post('/compatibility', visaController.checkCompatibility);

export default router;