import express from 'express';
import { dropAccount, login, logout, profile, register, privacyCheck } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// router.post('/logout', logout);
router.delete('/', authMiddleware, dropAccount);
router.get('/profile', authMiddleware, profile);
router.post('/privacy_check', authMiddleware, privacyCheck);

export default router;
