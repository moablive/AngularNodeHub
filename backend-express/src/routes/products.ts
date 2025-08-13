import { Router } from 'express';
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/produtoController';
import { checkAuth } from '../middleware/authMiddleware';
import upload from '../middleware/upload';

const router = Router();

// Aplica o middleware de autenticação para todas as rotas de produtos
router.use(checkAuth);

// Define as rotas do CRUD
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);

// As rotas de POST e PUT agora usam o middleware 'upload'
router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);

export default router;