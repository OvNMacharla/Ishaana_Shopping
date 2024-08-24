const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);