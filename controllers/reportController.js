const User = require('../models/UserModel');
const Income = require('../models/IncomeModel');
const Account = require('../models/AccountModel');
const moment = require('moment');
const catchAsync = require('../util/CatchAsync');
const AppError = require('../util/AppError');

exports.getMonthlyIncomeStats = async (userId) => {
  try {
    const user = await User.findById(userId);
    const userAccount = await Account.findById(user.account._id);
    let temp = userAccount.totalIncome;
    let incomeForCurrentMonth = temp - user.totalIncomeForLastMonth;
    user.totalIncomeForLastMonth = temp;
    user.incomeFlowReport.push(
      `${incomeForCurrentMonth} gained income for the month of ${moment().format(
        'MMMM'
      )}`
    );
    await user.save({ validateBeforeSave: false });
    return incomeForCurrentMonth;
  } catch (error) {
    console.log(error);
  }
};

exports.getMontlyExpenseStats = async (userId) => {
  try {
    const user = await User.findById(userId);
    const userAccount = await Account.findById(user.account._id);
    let temp = userAccount.totalExpense;
    let expenseForCurrentMonth = temp - user.totalExpenseForLastMonth;
    user.totalExpenseForLastMonth = temp;
    user.expenseFlowReport.push(
      `${expenseForCurrentMonth} in expenses for the month of ${moment().format(
        'MMMM'
      )}`
    );
    await user.save({ validateBeforeSave: false });
    return expenseForCurrentMonth;
  } catch (error) {
    console.log(error);
  }
};
