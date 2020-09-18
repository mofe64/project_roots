const User = require('../models/UserModel');
const Bill = require('../models/BillModel');
const Account = require('../models/AccountModel');
const moment = require('moment');

exports.chargeBill = async (userId) => {
  const user = await User.findById(userId);
  const userAccount = await Account.findById(user.account._id);
  const userBills = await Bill.find({ account: user.account._id });
  let dueMonthlyBills = [];
  let dueYearlyBills = [];
  userBills.forEach((bill) => {
    if (bill.type == 'monthly') {
      if (moment(bill.dueDate).format('DD') == moment().format('DD')) {
        dueMonthlyBills.push(bill);
      }
    }
    if (bill.type == 'yearly') {
      if (moment(bill.dueDate).format('MMM-DD') == moment().format('MMM-DD')) {
        dueYearlyBills.push(bill);
      }
    }
  });
  if (dueMonthlyBills.length > 0) {
    dueMonthlyBills.forEach((bill) => {
      userAccount.totalExpense += bill.amount;
      userAccount.balance = userAccount.totalIncome - userAccount.totalExpense;
    });
  }
  if (dueYearlyBills.length > 0) {
    dueYearlyBills.forEach((bill) => {
      userAccount.totalExpense += bill.amount;
      userAccount.balance = userAccount.totalIncome - userAccount.totalExpense;
    });
  }
  await userAccount.save();
};
