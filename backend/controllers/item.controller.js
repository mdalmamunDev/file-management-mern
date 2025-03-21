import Item from '../models/item.model.js';
import multer from "multer";
import path from "path";


// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files to "uploads/" directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage }).single("file");


// Create an Item
export const createItem = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: "File upload failed" });
            }

            const { name, user_id, parent_id, is_favorite, size, type } = req.body;

            // Create item with file details (if file exists)
            const newItem = new Item({
                name,
                user_id,
                parent_id: parent_id || null,
                path: req.file ? `/uploads/${req.file.filename}` : null,
                is_favorite: is_favorite || false,
                size: req.file ? req.file.size : size || 0,
                type: req.file ? req.file.mimetype : type || "unknown"
            });

            await newItem.save();
            res.status(201).json({ message: "Item created successfully", item: newItem });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get all Items (with optional filters)
export const getItems = async (req, res) => {
    try {
        const filter = {};
        if (req.query.user_id) {
            filter.user_id = req.query.user_id;
        }
        if (req.query.parent_id) {
            filter.parent_id = req.query.parent_id;
        }

        const items = await Item.find(filter).populate('user_id', 'name email').populate('parent_id', 'name');
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single Item by ID
export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('user_id', 'name email').populate('parent_id', 'name');
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an Item
export const updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an Item
export const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
