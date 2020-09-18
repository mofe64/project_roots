const Category = require('../models/CategoryModel');
const catchAsync = require('../util/CatchAsync');
const AppError = require('../util/AppError');

//TODO CREATE NEW BILLS CATEGORY
exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create({
    name: req.body.name,
  });
  res.status(201).json({
    status: 'success',
    category: newCategory,
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const catgories = await Category.find();
  res.status(200).json({
    status: 'success',
    no_of_categories: catgories.length,
    catgories,
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ name: req.params.categoryname });
  if (!category) {
    return next(new AppError('No category with that name found'));
  }
  res.status(200).json({
    status: 'success',
    category,
  });
});
