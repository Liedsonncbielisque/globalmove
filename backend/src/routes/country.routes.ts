import { Router } from 'express';
import { countryController } from '../controllers/country.controller';

const router = Router();

router.get('/', countryController.getAll);
router.get('/:id', countryController.getById);

export default router;