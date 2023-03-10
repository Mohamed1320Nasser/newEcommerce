const multer = require("multer");
const AppError = require("./AppError");
let options = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    // console.log(file);
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("image only", 400), true);
    }
  }
  const upload = multer({ storage, fileFilter });
  return upload;
};
exports.fileUpload = (fieldName, folderName) =>
  options(folderName).single(fieldName);

exports.fileMixUpload = (fieldArry, folderName) =>
  options(folderName).fields(fieldArry);
// const multer = require('multer');
// const ApiError = require('../utils/apiError');

// const multerOptions = () => {

//   const multerStorage = multer.memoryStorage();

//   const multerFilter = function (req, file, cb) {
//     if (file.mimetype.startsWith('image')) {
//       cb(null, true);
//     } else {
//       cb(new ApiError('Only Images allowed', 400), false);
//     }
//   };

//   const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

//   return upload;
// };

// exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

// exports.uploadMixOfImages = (arrayOfFields) =>
//   multerOptions().fields(arrayOfFields);
