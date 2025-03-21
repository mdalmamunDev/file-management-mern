import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const ItemSchema = new mongoose.Schema({
    id: Number, // Auto-incremented field
    name: {
        type: String,
        required: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: false
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
    size: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        required: true 
    },
});

// Apply Auto-Increment Plugin
ItemSchema.plugin(AutoIncrement(mongoose), { inc_field: 'id' });

const Item = mongoose.model('Item', ItemSchema);

export default Item;
