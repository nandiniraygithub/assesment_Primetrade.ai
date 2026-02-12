import jwt from "jsonwebtoken";
import ErrorHandler from "./errormiddleware.js";
import User from "../model/user.js"
import catchAsyncError from "./catchmiddleware.js";

// Authenticated user
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);
  if (!req.user) return next(new ErrorHandler("User not found", 404));

  next();
});

// Role-based access
export const authorizedRoles = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
    }
    next();
  });
};
