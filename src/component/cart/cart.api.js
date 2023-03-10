const { protectedRoutes, allowedTo } = require("../users/user.auth");
const {
  addProductToCart,
  removeProductFromeCart,
  updateQuantity,
  applyCoupon,
  getUserCart,
} = require("./cart.service");

const router = require("express").Router();
router.use(protectedRoutes, allowedTo("user"));
router
  .route("/")
  .post(addProductToCart)
  .delete(removeProductFromeCart)
  .put(updateQuantity)
  .get(getUserCart);
  router.post("/applyCoupon",applyCoupon)
module.exports = router;
