import express from 'express';
import { createItem, getItems, updateItem, deleteItem } from '../controllers/item.controller.js';

const router = express.Router();
// CRUD Routes
router.post('/', createItem);
router.get('/', getItems);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
