import Item from "../models/item.model.js";


const formatSize = (bytes) => {
    if (bytes >= 1073741824) { // GB
        return (bytes / 1073741824).toFixed(2) + " GB";
    } else if (bytes >= 1048576) { // MB
        return (bytes / 1048576).toFixed(2) + " MB";
    } else if (bytes >= 1024) { // KB
        return (bytes / 1024).toFixed(2) + " KB";
    } else { // Bytes
        return bytes + " Bytes";
    }
};

// Get categorized item statistics
export const getMyFiles = async (req, res) => {
    try {
        const userId = req.user?.id; // Assuming user_id is passed as a query param

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Define types and their respective filters
        const types = [
            { name: "Folder", type: "folder", filter: { type: "folder", user_id: userId } },
            { name: "Image", type: "image", filter: { type: "image", user_id: userId } },
            { name: "Videos", type: "video", filter: { type: "video", user_id: userId } },
            { name: "Audios", type: "audio", filter: { type: "audio", user_id: userId } },
            { name: "Documents", type: "document", filter: { type: 'document', user_id: userId } },
            { name: "Favorites", type: "favorite", filter: { is_favorite: true, user_id: userId } }
        ];

        // Fetch counts and total size for each category
        const data = {};
        data.types = await Promise.all(types.map(async (category) => {
            const count = await Item.countDocuments(category.filter);
            const totalSize = await Item.aggregate([
                { $match: category.filter },
                { $group: { _id: null, size: { $sum: "$size" } } }
            ]);

            return {
                name: category.name,
                count,
                size: totalSize.length > 0 ? formatSize(totalSize[0].size) : "0 Bytes",
                type: category.type,
            };
        }));
        res.status(200).json({ message: "Data retrieved successfully", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
