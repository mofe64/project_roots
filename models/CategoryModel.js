const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
  },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
