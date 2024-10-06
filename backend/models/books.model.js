const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: String,
  author: String,
  genre: String,
}, {timestamps : true});

const TheBooks = mongoose.model("TheBooks", bookSchema);

module.exports = { TheBooks };
