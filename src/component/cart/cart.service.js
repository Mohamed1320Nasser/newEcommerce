const CartModel = require("./cart.model");
const productModel = require("../product/product.model");
const couponModel = require("../coupon/coupon.model.js");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");

//to calc total price in cart
const calcTotalCartPrice = (Cart) => {
  let totalPrice = 0;
  Cart.cartItems.forEach((ele) => {
    totalPrice += ele.price * ele.quantity;
  });
  Cart.totalCartPrice = totalPrice;
  if (Cart.totalPriceAfterDiscount) {
    Cart.totalPriceAfterDiscount = (
      Cart.totalCartPrice -
      (Cart.totalCartPrice * Cart.discount) / 100
    ).toFixed(2);
  }
};
// add product to cart
exports.addProductToCart = catchAsyncError(async (req, res, next) => {
  let { price } = await productModel.findById(req.body.product).select("price");
  console.log(price);
  req.body.price = price;
  let Cart = await CartModel.findOne({ user: req.user._id }); //.populate({ path: "cartItems.product", select: "price",});
  if (!Cart) {
    let newCart = new CartModel({
      cartItems: [req.body],
      user: req.user._id,
    });
    calcTotalCartPrice(newCart);
    await newCart.save();
    res.status(200).json(newCart);
  } else {
    let findProduct = Cart.cartItems.find(
      (ele) => ele.product.toString() == req.body.product.toString()
    );
    if (findProduct) {
      findProduct.quantity += 1;
    } else {
      Cart.cartItems.push(req.body);
    }
    calcTotalCartPrice(Cart);
    await Cart.save();
    res.status(200).json(Cart);
  }
});

//remov product from cart
exports.removeProductFromeCart = catchAsyncError(async (req, res, next) => {
  const Cart = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.body.itemId } } },
    { new: true }
  );
  calcTotalCartPrice(Cart);
  await Cart.save();
  !Cart && next(new AppError("cartItems not found", 404));
  Cart && res.status(200).json(Cart);
});

// update quantity of cart
exports.updateQuantity = catchAsyncError(async (req, res, next) => {
  let Cart = await CartModel.findOne({ user: req.user._id });

  let findProduct = Cart.cartItems.find(
    (ele) => ele.product.toString() == req.body.product.toString()
  );
  if (!findProduct) return next(new AppError("product Not faund", 404));
  if (findProduct) {
    findProduct.quantity = req.body.quantity;
  }
  calcTotalCartPrice(Cart);
  await Cart.save();
  res.status(200).json(Cart);
});

//applying coupon 
exports.applyCoupon = catchAsyncError(async (req, res, next) => {
  let coupon = await couponModel.findOne({
    code: req.body.code,
    expieres: { $gt: Date.now() },
  });

  if (!coupon) return next(new AppError("coupon not found or expired", 404));
  let Cart = await CartModel.findOne({ user: req.user._id });
  Cart.totalPriceAfterDiscount = (
    Cart.totalCartPrice -
    (Cart.totalCartPrice * coupon.discount) / 100
  ).toFixed(2);
  Cart.discount = coupon.discount;
  await Cart.save();
  res.status(200).json(Cart);
});

// get cart owner
exports.getUserCart = catchAsyncError(async (req, res, next) => {
  const Cart = await CartModel.findOne({ user: req.user._id });
  res.status(200).json({
    status: "success",
    numOfCartItems: Cart.cartItems.length,
    data: Cart,
  });
});
