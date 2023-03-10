const { protectedRoutes, allowedTo } = require("../users/user.auth");
const {
  addToAddress,
  getAddressFromUser,
  removeFromeAddress,
} = require("./address.service");

const router = require("express").Router();
router.use(protectedRoutes, allowedTo("user"));
router
  .route("/")
  .patch(addToAddress)
  .delete(removeFromeAddress)
  .get(getAddressFromUser);
module.exports = router;
