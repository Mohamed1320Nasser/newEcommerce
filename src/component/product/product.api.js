const { fileMixUpload } = require("../../utils/uploadFile");
const {
  creatProduct,
  getProducts,
  getProduct,
  updProduct,
  delProduct,
} = require("./product.services");
const router = require("express").Router();
fields = [
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
];
router
  .route("/")
  .post(fileMixUpload(fields, "product"), creatProduct)
  .get(getProducts);
router
  .route("/:id")
  .get(getProduct)
  .put(fileMixUpload(fields, "product"), updProduct)
  .delete(delProduct);
module.exports = router;
