const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    itemImage: {
        type: String,
        required: true
    },
    category:
    {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

module.exports = mongoose.model('Item', itemSchema);