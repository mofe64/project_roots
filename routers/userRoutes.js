const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express();

router.route('/signup').post(authController.register);
router.route('/login').post(authController.login);

router.route('/:id').get(userController.getUser);
module.exports = router;
