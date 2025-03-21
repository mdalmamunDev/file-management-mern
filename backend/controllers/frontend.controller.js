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
            { name: "Folder", filter: { type: "folder", user_id: userId } },
            { name: "Image", filter: { type: { $regex: /^image\// }, user_id: userId } },
            { name: "Videos", filter: { type: { $regex: /^video\// }, user_id: userId } },
            { name: "Audios", filter: { type: { $regex: /^audio\// }, user_id: userId } },
            { name: "Documents", filter: { type: { $in: ["application/pdf", "application/msword"] }, user_id: userId } },
            { name: "Favorites", filter: { is_favorite: true, user_id: userId } }
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
                size: totalSize.length > 0 ? formatSize(totalSize[0].size) : "0 Bytes"
            };
        }));

        data.recent = await Item.find({ user_id: userId })
        .sort({ _id: -1 }) // Sort by most recent
        .limit(10) // Get only 10 items
        .select("name type path size createdAt"); // Return only relevant fields


        res.status(200).json({ message: "Data retrieved successfully", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
