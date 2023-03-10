const SubCategoryModel = require("./subCategory.model");
const facrory = require("../Handlers/handler.factory");





// to add a new Subcategory

module.exports.creatSubCategory = facrory.careatOne(SubCategoryModel);

// to get all SubCategories
module.exports.getSubCategories = facrory.getAll(SubCategoryModel);

// to get specific SubCategory
module.exports.getSubCategory = facrory.getOne(SubCategoryModel);

// to delete an SubCategory
module.exports.delSubCategory = facrory.deleteOn(SubCategoryModel);

// to update SubCategory name
module.exports.updSubCategory = facrory.updateOne(SubCategoryModel);
