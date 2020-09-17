const express = require('express');
const authController = require('../controllers/authController');

const router = express();

router.route('/signup').post(authController.register);
router.route('/login').post(authController.login);

module.exports = router;
