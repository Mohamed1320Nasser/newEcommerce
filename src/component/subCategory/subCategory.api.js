const {
  creatSubCategory,
  getSubCategory,
  getSubCategories,
  updSubCategory,
  delSubCategory,
} = require("./subCategory.services");

const router = require("express").Router({mergeParams: true});


router.route("/").post(creatSubCategory).get(getSubCategories);
router
  .route("/:id")
  .get(getSubCategory)
  .put(updSubCategory)
  .delete(delSubCategory);

module.exports = router;
