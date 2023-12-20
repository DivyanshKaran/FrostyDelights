class AppError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;
    this.status = `${statusCode}`.startsWith("4") ? "Failed" : "Error";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
