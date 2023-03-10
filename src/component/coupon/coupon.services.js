const CoupnModel = require("./coupon.model");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const facrory = require("../Handlers/handler.factory");

// to add a new Coupn
module.exports.creatCoupn = catchAsyncError(async (req, res, next) => {
  const Coupn = new CoupnModel(req.body);
  await Coupn.save();
  res.status(200).json(Coupn);
});
// to get all Coupns
module.exports.getCoupns = facrory.getAll(CoupnModel);

// to get specific Coupn
module.exports.getCoupn = facrory.getOne(CoupnModel);
// to delete an Coupn
module.exports.delCoupn = facrory.deleteOn(CoupnModel);
// to update Coupnname

module.exports.updCoupn = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const isCoupn = await CoupnModel.findById(id);
  console.log(isCoupn);
  console.log(req.user);
  if (isCoupn.user._id.toString() === req.user._id.toString()) {
    const Coupn = await CoupnModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    !Coupn && next(new AppError("Coupnnot found", 404));
    Coupn && res.status(200).json(Coupn);
  } else {
    return next(new AppError("you are not allowed to update"));
  }
});
