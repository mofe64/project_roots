const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account',
  },
});

const Expense = mongoose.model('Income', expenseSchema);
module.exports = Expense;
