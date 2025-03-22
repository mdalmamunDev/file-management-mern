import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true
        },
        parent_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item', // Self-reference for hierarchical structure
            default: null
        },
        path: {
            type: String,
            required: false
        },
        is_favorite: {
            type: Boolean,
            default: false
        },
        is_privet: {
            type: Boolean,
            default: false
        },
        size: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const Item = mongoose.model('Item', ItemSchema);

export default Item;
