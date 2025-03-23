import Item from '../models/item.model.js';
import multer from "multer";
import path from "path";
import fs from "fs";


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


const getFileCategory = (mimeType) => {
    if (mimeType.startsWith('image/')) {
        return 'image';
    } else if (mimeType.startsWith('video/')) {
        return 'video';
    } else if (mimeType.startsWith('audio/')) {
        return 'audio';
    } else if (mimeType === 'application/x-directory' || mimeType === 'folder') {
        return 'folder';
    } else {
        return 'document';
    }
};
// Create an Item
export const createItem = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: "File upload failed", err });
            }

            const { name, parent_id, is_favorite, size, type } = req.body;

            // Create item with file details (if file exists)
            const newItem = new Item({
                name,
                user_id: req.user ? req.user.id : null,
                parent_id: parent_id || null,
                path: req.file ? `uploads/${req.file.filename}` : null,
                is_favorite: is_favorite || false,
                size: req.file ? req.file.size : size || 0,
                type: getFileCategory(req.file ? req.file.mimetype : ''),
            });

            await newItem.save();
            res.status(201).json({ message: "Item created successfully", item: newItem });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const copyItem = async (req, res) => {
    try {
        const { _id, parent_id } = req.body;

        const item = await Item.findById(_id);
        if (!item) return res.status(404).json({ error: "Item not found" });

        // Create a copy
        const newItem = new Item({
            ...item.toObject(),
            _id: undefined,
            parent_id: parent_id,
            createdAt: undefined,
            updatedAt: undefined,
        });
        await newItem.save();

        res.status(201).json({ message: "Item copied successfully", item: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create an Item
export const createFolder = async (req, res) => {
    try {
        // res.status(201).json({ message: "Item created successfully", item: req.body });


        const { name, parent_id, is_favorite } = req.body;

        // // Create item with file details (if file exists)
        const newItem = new Item({
            name,
            user_id: req.user ? req.user.id : null,
            parent_id: parent_id || null,
            is_favorite: is_favorite || false,
            type: 'folder',
        });

        await newItem.save();
        res.status(201).json({ message: "Item created successfully", item: newItem });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get all Items (with optional filters)
export const getItems = async (req, res) => {
    try {
        const { user_id, parent_id, group } = req.query;

        // Build filter object
        const filter = {};
        if (user_id) filter.user_id = user_id;
        if (parent_id) filter.parent_id = parent_id;

        // Dynamically apply type filter if needed
        if (group && ['image', 'video', 'audio', 'document', 'folder'].includes(group)) filter.type = group;
        if (group === 'favorite') filter.is_favorite = true;
        if (group === 'private') filter.is_private = true;

        const sort = { createdAt: -1 };
        let limit, items;
        if (group === 'recent') {
            limit = 10;
            filter.type = { $ne: 'folder' };
        }
        if (group === 'all') {
            filter.parent_id = null;
            const folders = await Item.find({ ...filter, type: 'folder' }).sort(sort);
            const files = await Item.find({ ...filter, type: { $ne: 'folder' } }).sort(sort);
            items = [...folders, ...files];
        } else {
            items = await Item.find(filter).sort(sort).limit(limit);
        }

        const itemsWithCount = await Promise.all(
            items.map(async (item) => {
                if (item.type === "folder") {
                    const childCount = await Item.countDocuments({ parent_id: item._id });
                    return { ...item.toObject(), childCount };
                }
                return item.toObject();
            })
        );

        // get all folders for copy & move
        const folders = await Item.find({type: 'folder'});

        res.json({items: itemsWithCount, folders: folders});
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

        // If the item has a stored file, delete it from the "uploads" folder
        if (deletedItem.path) {
            const filePath = path.join(process.cwd(), deletedItem.path); // Absolute path
            fs.unlink(filePath, (err) => {
                if (err && err.code !== 'ENOENT') {
                    console.error("Error deleting file:", err);
                }
            });
        }

        // Delete all child items (sub-items) of the deleted folder
        await Item.deleteMany({ parent_id: deletedItem._id });

        res.json({ message: 'Item and its associated files deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
