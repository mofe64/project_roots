const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express();

router.route('/:categoryname').get(categoryController.getCategory);
router.route('/').post(categoryController.createCategory);
router.route('/all').get(categoryController.getCategories);

module.exports = router;
