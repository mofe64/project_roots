const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please specify the bill amount'],
  },
  dueDate: {
    type: Date,
    required: [true, 'please specify the date'],
  },
  type: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly'],
  },
  name: {
    type: String,
    required: [true, 'Please enter the bill name'],
  },
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account',
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
});

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
