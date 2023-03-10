const ProductModel = require("./product.model");
var slugify = require("slugify");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const facrory = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/apiFeatuares");
// to add a new Product
module.exports.creatProduct = catchAsyncError(async (req, res, next) => {
  let img = [];
  req.body.slug = slugify(req.body.name);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.files.images.forEach((ele) => {
    img.push(ele.filename);
  });
  req.body.images = img;
  const Product = new ProductModel(req.body);
  await Product.save();
  res.status(200).json({ result: Product });
});
// to get all Products
module.exports.getProducts = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .paginat()
    .filter()
    .sort()
    .search()
    .fields();
  const Product = await apiFeatures.mongooseQuery;
  !Product && next(new AppError("Product not found", 404));
  Product && res.status(200).json({ page: apiFeatures.page, Product });
});

// to get specific Product
module.exports.getProduct = facrory.getOne(ProductModel);
// to delete an Product
module.exports.delProduct = facrory.deleteOn(ProductModel);
// to update Product name

module.exports.updProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (req.files.imageCover) {
    req.body.imageCover = req.files.imageCover[0].filename;
  }
  if (req.files.images) {
    let img = [];
    req.files.images.forEach((ele) => {
      img.push(ele.filename);
    });
    req.body.images = img;
  }
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const Product = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !Product && next(new AppError("Product not found", 404));
  Product && res.status(200).json(Product);
});
