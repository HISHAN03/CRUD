"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    pageCount: {
        type: Number,
        required: true
    }
});
exports.Book = mongoose.model('Book', bookSchema);
