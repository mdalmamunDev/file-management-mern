import express from 'express';
import { createItem, getItems, updateItem, deleteItem, getItemById, createFolder, copyItem } from '../controllers/item.controller.js';

const router = express.Router();
// CRUD Routes
router.post('/', createItem);
router.post('/folders', createFolder);
router.post('/copy', copyItem);
router.get('/', getItems);
router.get('/:id', getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
