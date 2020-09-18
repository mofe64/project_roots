const Income = require('../models/IncomeModel');
const Expense = require('../models/ExpenseModel');
const Account = require('../models/AccountModel');
const User = require('../models/UserModel');
const Category = require('../models/CategoryModel');
const catchAsync = require('../util/CatchAsync');
const AppError = require('../util/AppError');

exports.getAccount = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  //console.log(user);
  const userAccountId = user.account._id;
  //console.log(userAccountId);
  const userAccount = await Account.findById(userAccountId)
    .populate({
      path: 'income',
    })
    .populate({
      path: 'expenses',
    });
  //console.log(userAccount);
  res.status(200).json({
    status: 'success',
    userAccount,
  });
});

exports.addIncome = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  //console.log(user);
  const userAccountId = user.account._id;
  const userAccount = await Account.findById(userAccountId);
  const category = await Category.findOne({ name: req.body.category });
  const newIncome = new Income({
    amount: req.body.amount,
    description: req.body.description,
    account: userAccount._id,
    status: req.body.status,
    category: category._id,
  });
  await newIncome.save();
  userAccount.totalIncome += newIncome.amount;
  userAccount.balance = userAccount.totalIncome - userAccount.totalExpense;
  await userAccount.save();
  res.status(201).json({
    status: 'success',
    updatedAccount: userAccount,
  });
});

exports.addExpense = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  const userAccountId = user.account._id;
  const userAccount = await Account.findById(userAccountId);
  const category = await Category.findOne({ name: req.body.category });
  const newExpense = new Expense({
    amount: req.body.amount,
    description: req.body.description,
    account: userAccount._id,
    category: category._id,
    //status: req.body.status,
  });
  await newExpense.save();
  userAccount.totalExpense += newExpense.amount;
  userAccount.balance = userAccount.totalIncome - userAccount.totalExpense;
  await userAccount.save();
  res.status(201).json({
    status: 'success',
    updatedAccount: userAccount,
  });
});

exports.getSingleIncome = catchAsync(async (req, res, next) => {
  const requestedIncome = Income.findById(req.params.incomeId);
  if (!requestedIncome) {
    return next(new AppError('No income found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    income: requestedIncome,
  });
});

exports.getSingleExpense = catchAsync(async (req, res, next) => {
  const requestedExpense = Expense.findById(req.params.expenseId);
  if (!requestedExpense) {
    return next(new AppError('No expense found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    income: requestedExpense,
  });
});

exports.getallUserIncome = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  const incomeList = await Income.find({ account: user.account._id });
  res.status(200).json({
    status: 'success',
    no_of_income_entries: incomeList.length,
    incomeList,
  });
});
exports.getallUserExpenses = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  const expensesList = await Expense.find({ account: user.account._id });
  res.status(200).json({
    status: 'success',
    no_of_expense_entries: expensesList.length,
    expensesList,
  });
});
