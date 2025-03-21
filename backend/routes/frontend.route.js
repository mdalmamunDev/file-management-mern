import express from 'express';
import { getMyFiles } from '../controllers/frontend.controller.js';

const router = express.Router();
// CRUD Routes
router.get('/my_files', getMyFiles);

export default router;
