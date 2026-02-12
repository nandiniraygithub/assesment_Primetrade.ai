// Custom Error Class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error handling middleware
export const errorMiddleware = (err, req, res, next) => {
  // Set defaults
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle specific errors
  if (err.code === 11000) err = new ErrorHandler("Duplicate field value entered", 400);
  if (err.name === "JsonWebTokenError") err = new ErrorHandler("JWT is invalid", 400);
  if (err.name === "TokenExpiredError") err = new ErrorHandler("JWT has expired", 400);

  const errorMessage = err.errors
    ? Object.values(err.errors).map(e => e.message).join(" ")
    : err.message;

  res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
