const CategoryModel = require("./category.model");
var slugify = require("slugify");
const AppError = require("../../utils/AppError");
const factory = require("../Handlers/handler.factory");
// const sharp = require("sharp");



// to add a new category

module.exports.creatCategory = factory.careatOne(CategoryModel);
// to get categories

module.exports.getCategories = factory.getAll(CategoryModel);
// to get specific category

module.exports.getCategory = factory.getOne(CategoryModel);
// to delete an category

module.exports.deleleCategory = factory.deleteOn(CategoryModel);
// to update category name

module.exports.updCategory = factory.updateOne(CategoryModel);
