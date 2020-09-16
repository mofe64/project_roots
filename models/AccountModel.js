const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  totalIncome: {
    type: Number,
  },
  totalExpense: {
    type: Number,
  },
  balance: {
    type: Number,
  },
  financeGrade: {
    type: String,
  },
  accountOwner: {
    type: String,
  },
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
