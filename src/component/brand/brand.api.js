const { fileUpload } = require("../../utils/uploadFile");
const {
  getBrands,
  creatBrand,
  getBrand,
  updBrand,
  delBrand,
} = require("./brand.services");

const router = require("express").Router();

router.route("/").post(fileUpload("image", "brand"), creatBrand).get(getBrands);
router
  .route("/:id")
  .get(getBrand)
  .put(fileUpload("image", "brand"), updBrand)
  .delete(delBrand);

module.exports = router;
