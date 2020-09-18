const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user ID'],
    },
    totalIncome: {
      type: Number,
      default: 0,
    },
    totalExpense: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    financeGrade: {
      type: String,
    },
    accountOwner: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

accountSchema.virtual('income', {
  ref: 'Income',
  foreignField: 'account',
  localField: '_id',
});

accountSchema.virtual('expenses', {
  ref: 'Expense',
  foreignField: 'account',
  localField: '_id',
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
