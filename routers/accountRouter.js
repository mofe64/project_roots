const express = require('express');
const accountController = require('../controllers/AccountController');

const router = express();

router.route('/income/:userId').post(accountController.addIncome);
router.route('/expense/:userId').post(accountController.addExpense);
router.route('/:userId').get(accountController.getAccount);
router.route('/:userId/income/all').get(accountController.getallUserIncome);
router.route('/:userId/expense/all').get(accountController.getallUserExpenses);

//TODO SET ROUTES FOR INDIVIDUAL EXPENSES AND INCOME
module.exports = router;
