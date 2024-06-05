const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const booksSchema = new Schema({
    name: String,
    image: String
});

const booksModel = mongoose.model("books", booksSchema);

module.exports = booksModel;