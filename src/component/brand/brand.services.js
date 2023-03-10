const BrandModel = require("./brand.model");
const facrory = require("../Handlers/handler.factory");



// to add a new Brand
module.exports.creatBrand = facrory.careatOne(BrandModel);
// to get all Brands
module.exports.getBrands = facrory.getAll(BrandModel);

// to get specific Brand
module.exports.getBrand = facrory.getOne(BrandModel);

// to delete an Brand
module.exports.delBrand = facrory.deleteOn(BrandModel);

// to update Brand name
module.exports.updBrand = facrory.updateOne(BrandModel)
