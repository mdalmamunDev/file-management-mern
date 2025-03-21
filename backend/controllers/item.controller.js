import Item from "../models/item.model.js";

// Create an Item
export const createItem = async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an Item
export const updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an Item
export const deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
