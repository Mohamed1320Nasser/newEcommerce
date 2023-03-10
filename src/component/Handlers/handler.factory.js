let slugify = require("slugify");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");
const ApiFeatures = require("../../utils/apiFeatuares");
exports.deleteOn = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let Document = await Model.findByIdAndDelete(id);
    !Document && next(new AppError("Document not found", 404));
    Document.remove();
    Document && res.status(204).json("deleted");
  });
};
// exports.getAll = (Model) => {
//   return catchAsyncError(async (req, res, next) => {
//     let filter = {};
//     if (req.params.id) {
//       filter = { category: req.params.id };
//     } else {
//       ///////////1-pagination/////////
//       let queryString = { ...req.query };
//       let page = req.query.page * 1 || 1;
//       if (page < 1) page = 1;
//       let limit = 5;
//       let skip = (page - 1) * limit;
//       /////////////////2- filter///////
//       let excludeParams = ["page", "sort", "keword", "limit"];
//       excludeParams.forEach((ele) => {
//         delete queryString[ele];
//       });
//       filter = { queryString };
//     }
//     const Documents = await Model.find(filter);
//     !Documents && next(new AppError("Documents not found", 404));
//     Documents && res.status(200).json({ result: Documents });
//   });
// };
exports.getAll = (Model) =>
  catchAsyncError(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginat(documentsCounts)
      .filter()
      .search()
      .fields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });

exports.getOne = (Model, populationOpt) =>
  catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    // 1) Build query
    let query = Model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }
    // 2) Execute query
    const document = await query;
    if (!document) {
      return next(new AppError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });
exports.careatOne = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    const Document = new Model(req.body);
    await Document.save();
    res.status(200).json({ result: Document });
  });
};
exports.updateOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    if (req.file.image) {
      req.body.image = req.file.filename;
    }
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new AppError(`No document for this id ${req.params.id}`, 404)
      );
    }
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ data: document });
  });
