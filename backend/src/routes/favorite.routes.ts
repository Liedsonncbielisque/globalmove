import { Router } from 'express';
import { favoriteController } from '../controllers/favorite.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, favoriteController.getUserFavorites);
router.post('/', authenticate, favoriteController.addFavorite);
router.delete('/:id', authenticate, favoriteController.removeFavorite);

export default router;