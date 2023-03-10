const { protectedRoutes, allowedTo } = require("../users/user.auth");
const {
  creatCoupn,
  getCoupns,
  getCoupn,
  updCoupn,
  delCoupn,
} = require("./coupon.services");

const router = require("express").Router();

router
  .route("/")
  .post(protectedRoutes, allowedTo("user"), creatCoupn)
  .get(getCoupns);
router
  .route("/:id")
  .get(getCoupn)
  .put(protectedRoutes, allowedTo("user"), updCoupn)
  .delete(protectedRoutes, allowedTo("user", "admin"), delCoupn);

module.exports = router;
