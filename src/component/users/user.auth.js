const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const facrory = require("../Handlers/handler.factory");
const userModel = require("./user.model");

//sign Up
module.exports.SignUp = catchAsyncError(async (req, res, next) => {
  const IsUser = await UserModel.findOne({ email: req.body.email });
  if (IsUser) return next(new AppError("User is already exists", 401));
  const User = new UserModel(req.body);
  await User.save();
  res.status(200).json(User);
});

//sign in
module.exports.Signin = catchAsyncError(async (req, res, next) => {
  const User = await UserModel.findOne({ email: req.body.email });
  if (!User || !(await bcrypt.compare(req.body.password, User.password)))
    return next(new AppError("incorrect email or password", 401));
  const token = jwt.sign(
    { userId: User._id, name: User.name },
    process.env.secrit_key
  );
  res.status(200).json({ token });
});

//authentication 
exports.protectedRoutes = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next(new AppError("token inprovided", 401));
  let decoded = jwt.verify(token, process.env.secrit_key);
  const user = await UserModel.findById(decoded.userId);
  if (!user) return next(new AppError("User not found", 401));
  if (user.passwordChangeAt) {
    let changePassword = parseInt(user.passwordChangeAt.getTime() / 100);
    if (changePassword > decoded.iat)
      return next(new AppError("password changed", 401));
  }
  req.user = user;

  next();
});
 //authrization {detrmind if user or admin}
exports.allowedTo = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("You don't have permission to do this", 401));
    next();
  });
};
