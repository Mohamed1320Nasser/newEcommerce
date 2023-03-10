process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err.stack);
});

const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const { dbConnection } = require("./src/dataBase/db-Connection");
const port = process.env.PORT || 4000;
const morgan = require("morgan");
const AppError = require("./src/utils/AppError");
const GlobalMiddelwearErr = require("./src/utils/globalMiddelwearErr");
const { allRequires } = require("./src/utils");


// Connect with db
dbConnection();

// determine if devolopment or production is enabled
if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
}
// express app
app.use(express.json());

// Middlewares
app.use(express.static("uploads"));
app.use(GlobalMiddelwearErr);
//requires
allRequires(app);
app.all("*", (req, res, next) => {
  next(new AppError(`cannot get this route ${req.originalUrl} in her `, 404));
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.stack);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
