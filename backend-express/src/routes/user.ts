// src/routes/user.ts

import { Router } from 'express';
import { register, login, getAllUsers, deleteUser, updateUser } from '../controllers/userController';
import { checkAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getAllUsers', checkAuth, getAllUsers);
router.delete('/:id', checkAuth, deleteUser);
router.put('/:id', checkAuth, updateUser);

export default router;