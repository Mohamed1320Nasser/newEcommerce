const UserModel = require("../users/user.model");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");

module.exports.addToAddress = catchAsyncError(async (req, res, next) => {
  const { addresses } = await UserModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    { new: true }
  );
  console.log(addresses);
  !addresses && next(new AppError("address not found", 404));
  addresses && res.status(200).json(addresses);
});
module.exports.removeFromeAddress = catchAsyncError(async (req, res, next) => {
  const { addresses } = await UserModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { adresses: { _id: req.body.address } } },
    { new: true }
  );
  !addresses && next(new AppError("address not found", 404));
  addresses && res.status(200).json(addresses);
});
module.exports.getAddressFromUser = catchAsyncError(async (req, res, next) => {
  const { addresses } = await UserModel.findById(req.user._id);
  !addresses && next(new AppError("address not found", 404));
  addresses && res.status(200).json(addresses);
});
