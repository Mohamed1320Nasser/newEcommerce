const ReviewModel = require("./review.model");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const facrory = require("../Handlers/handler.factory");

// to add a new Review
module.exports.creatReview = catchAsyncError(async (req, res, next) => {
  const isReview = await ReviewModel.findOne({
    user: req.user._id.toString(),
    product: req.body.product,
  });
  if (isReview) return next(new AppError("you are Review already"));
  req.body.user = req.user._id.toString();
  const Review = new ReviewModel(req.body);
  await Review.save();
  res.status(200).json(Review);
});

// to get all Reviews
module.exports.getReviews = facrory.getAll(ReviewModel);

// to get specific Review
module.exports.getReview = facrory.getOne(ReviewModel);
// to delete an Review
module.exports.delReview = facrory.deleteOn(ReviewModel);

// to update Reviewname
module.exports.updReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const isReview = await ReviewModel.findById(id);
  console.log(isReview);
  console.log(req.user);
  if (isReview.user._id.toString() === req.user._id.toString()) {
    const Review = await ReviewModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    !Review && next(new AppError("Reviewnot found", 404));
    Review && res.status(200).json(Review);
  } else {
    return next(new AppError("you are not allowed to update"));
  }
});
