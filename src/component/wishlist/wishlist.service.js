const UserModel = require("../users/user.model");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");

module.exports.addToWishlist = catchAsyncError(async (req, res, next) => {
  const { wishlist } = await UserModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: req.body.product } },
    { new: true }
  );
  !wishlist && next(new AppError("Wishlistnot found", 404));
  wishlist && res.status(200).json(wishlist);
});
module.exports.removeFromeWishlist = catchAsyncError(async (req, res, next) => {
  const { wishlist } = await UserModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: req.body.product } },
    { new: true }
  );
  !wishlist && next(new AppError("Wishlist not found", 404));
  wishlist && res.status(200).json(wishlist);
});
module.exports.getWishlistFromUser = catchAsyncError(async (req, res, next) => {
  const { wishlist } = await UserModel.findById(req.user._id);
  !wishlist && next(new AppError("Wishlist not found", 404));
  wishlist && res.status(200).json(wishlist);
});
