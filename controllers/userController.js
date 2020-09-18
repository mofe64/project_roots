const AppError = require('../util/AppError');
const catchAsync = require('../util/CatchAsync');
const User = require('../models/UserModel');

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    user,
  });
});
