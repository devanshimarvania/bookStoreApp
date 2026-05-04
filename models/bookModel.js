const mongoose = require('mongoose');

const BookModelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: [String],
        required: true
    },
    publishYear: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    language: {
        type: [String],
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BookModel', BookModelSchema);
