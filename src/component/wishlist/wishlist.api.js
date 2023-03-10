const { protectedRoutes, allowedTo } = require("../users/user.auth");
const {
  addToWishlist,
  removeFromeWishlist,
  getWishlistFromUser,
} = require("./wishlist.service");

const router = require("express").Router();
router.use(protectedRoutes, allowedTo("user"));
router
  .route("/")
  .patch(addToWishlist)
  .delete(removeFromeWishlist)
  .get(getWishlistFromUser);
module.exports = router;
