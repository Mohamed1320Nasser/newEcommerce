const UserModel = require("./user.model");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const facrory = require("../Handlers/handler.factory");

// to add a new Brand
module.exports.creatUser = catchAsyncError(async (req, res, next) => {
  const IsUser = await UserModel.findOne({ email: req.body.email });
  if (IsUser) return next(new AppError("User is already exists", 401));
  const User = new UserModel(req.body);
  await User.save();
  res.status(200).json(User);
});
// to get all Users
module.exports.getUsers = facrory.getAll(UserModel);

// to get specific User
module.exports.getUser = facrory.getOne(UserModel);
// to delete an User
module.exports.delUser = facrory.deleteOn(UserModel);
// to update User name

module.exports.updUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const User = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
  !User && next(new AppError("User not found", 404));
  User && res.status(200).json(User);
});

//change password
module.exports.ChangePass = catchAsyncError(async (req, res, next) => {
  req.body.passwordChangeAt = Date.now();
  const { id } = req.params;
  const User = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
  !User && next(new AppError("User not found", 404));
  User && res.status(200).json(User);
});
