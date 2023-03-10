const { protectedRoutes, allowedTo } = require("../users/user.auth");
const {
  creatReview,
  getReviews,
  getReview,
  updReview,
  delReview,
} = require("./review.services");

const router = require("express").Router();

router
  .route("/")
  .post(protectedRoutes, allowedTo("user"), creatReview)
  .get(getReviews);
router
  .route("/:id")
  .get(getReview)
  .put(protectedRoutes, allowedTo("user"), updReview)
  .delete(protectedRoutes, allowedTo("user", "admin"), delReview);

module.exports = router;
