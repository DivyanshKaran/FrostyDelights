const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(400, message);
};

const handleDuplicateFieldsDB = (Err) => {
  const message = "Duplicate Field Value.Please Use another value";
  return new AppError(400, message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.erros).map((el) => el.message);
  const message = `Invalid Input Data on ${errors.join(". ")}`;
  return new AppError(400, message);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorprod = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("Error: ", err);

    res.status(500).json({
      status: "Error",
      message: "Internal Server Error: Something went Wrong",
    });
  }
};

module.exports = (err, req, re, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  if (process.env.NODE_ENV === "devlopment") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    error.name = err.name;

    if (error.name === "CastError") error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleValidationErrorDB(error);

    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    sendErrorprod(err.res);
  }
};
