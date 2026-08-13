import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// TODO: Adicionar middleware de autorização admin
router.get('/stats', authenticate, adminController.getStats);
router.post('/countries', authenticate, adminController.addCountry);
router.put('/countries/:id', authenticate, adminController.updateCountry);
router.patch('/countries/:id/toggle', authenticate, adminController.toggleCountryStatus);

export default router;