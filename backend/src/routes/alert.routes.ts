import { Router } from 'express';
import { alertController } from '../controllers/alert.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, alertController.getUserAlerts);
router.put('/:id/read', authenticate, alertController.markAsRead);
router.put('/read-all', authenticate, alertController.markAllAsRead);

export default router;