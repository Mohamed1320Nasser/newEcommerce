const mongoose = require("mongoose");
module.exports.dbConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://Mohamed:mo132000@cluster0.8nvmkez.mongodb.net/E-commerce")
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("error 1",err);
    });
};
