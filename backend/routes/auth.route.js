import express from 'express';
import { dropAccount, login, logout, profile, register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.delete('/drop_acc', dropAccount);
router.get('/profile', profile);

export default router;
