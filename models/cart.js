const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Cart', cartSchema);