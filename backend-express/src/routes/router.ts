import { Router } from 'express';

import userRoutes from './user';
import productsRouter from './products';

const router = Router();

router.use('/user', userRoutes);
router.use('/products', productsRouter);

export default router;