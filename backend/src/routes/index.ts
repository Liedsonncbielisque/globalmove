import { Router } from 'express';
import authRoutes from './auth.routes';
import countryRoutes from './country.routes';
import financialRoutes from './financial.routes';
import visaRoutes from './visa.routes';
import rankingRoutes from './ranking.routes';
import alertRoutes from './alert.routes';
import aiRoutes from './ai.routes';
import favoriteRoutes from './favorite.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'GlobalMove API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      countries: '/api/countries',
      financial: '/api/financial',
      visas: '/api/visas',
      ranking: '/api/ranking',
      alerts: '/api/alerts',
      ai: '/api/ai',
      favorites: '/api/favorites',
      admin: '/api/admin',
    },
  });
});

router.use('/auth', authRoutes);
router.use('/countries', countryRoutes);
router.use('/financial', financialRoutes);
router.use('/visas', visaRoutes);
router.use('/ranking', rankingRoutes);
router.use('/alerts', alertRoutes);
router.use('/ai', aiRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/admin', adminRoutes);

export default router;