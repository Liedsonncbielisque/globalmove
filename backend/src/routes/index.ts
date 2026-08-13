import { Router } from 'express';
import authRoutes from './auth.routes';
import countryRoutes from './country.routes';
import financialRoutes from './financial.routes';
import visaRoutes from './visa.routes';
import rankingRoutes from './ranking.routes';

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
    },
  });
});

router.use('/auth', authRoutes);
router.use('/countries', countryRoutes);
router.use('/financial', financialRoutes);
router.use('/visas', visaRoutes);
router.use('/ranking', rankingRoutes);

export default router;