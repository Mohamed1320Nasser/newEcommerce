const {
  creatCategory,
  getCategories,
  getCategory,
  updCategory,
  deleleCategory,
} = require("./category.services");
const subCategoryRoutes = require("../subCategory/subCategory.api");
const { fileUpload } = require("../../utils/uploadFile");
const { protectedRoutes, allowedTo } = require("../users/user.auth");
const router = require("express").Router();
router.use("/:id/subCategories", subCategoryRoutes);

router
  .route("/")

  .post(
    protectedRoutes,
    allowedTo("user"),
    fileUpload("image", "category"),
    creatCategory
  )
  .get(getCategories);
router
  .route("/:id/")
  .get(getCategory)
  .put(fileUpload("image", "category"), updCategory)
  .delete(deleleCategory);
module.exports=router;
