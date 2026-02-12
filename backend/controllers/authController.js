import User from "../model/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendToken } from "../utils/sendtoken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateEmailTemplate } from "../utils/emailTemplate.js";
import ErrorHandler from "../middleware/errormiddleware.js";
import catchAsyncError from "../middleware/catchmiddleware.js";

// Register User
export const register = catchAsyncError(async (req, res, next) => {

  const { name, email, password } = req.body || {};
  console.log(req.body)
  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const emailLower = email.toLowerCase();

  const userExists = await User.findOne({ email: emailLower });
  if (userExists) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: emailLower,
    password: hashedPassword,
    role: "user", // Force role to "user" always
  });

  sendToken(user, 201, "User registered successfully", res);
});

// Login User
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  // Normalized email
  const emailLower = email.toLowerCase();
  console.log(`Login attempt for: ${emailLower}`);

  const user = await User.findOne({ email: emailLower });

  if (!user) {
    console.log('User not found in DB');
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Debug password match (careful in prod)
  // console.log('Stored hash:', user.password);

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, "User logged in successfully", res);
});

// Logout User
export const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Get Current User
export const getUser = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// Forgot Password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Email is required", 400));
  }

  const emailLower = email.toLowerCase();

  const user = await User.findOne({ email: emailLower });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `http://localhost:3000/password/reset/${resetToken}`;

  const html = generateEmailTemplate(resetUrl);

  await sendEmail({
    email: user.email,
    subject: "Password Reset",
    html,
  });

  res.status(200).json({
    success: true,
    message: `Email sent to ${user.email}`,
  });
});

// Reset Password
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid or expired reset token", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, "Password reset successfully", res);
});

// Update Password
export const updatePassword = catchAsyncError(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // 1. Check if fields provided
  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  // 2. Check match
  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("New password does not match", 400));
  }

  // 3. Find user (with password field)
  const user = await User.findById(req.user.id).select("+password");

  // 4. Check current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect current password", 401));
  }

  // 5. Update
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  sendToken(user, 200, "Password updated successfully", res);
});

// Update Profile
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email?.toLowerCase(),
  };

  // Avatar logic would go here if implementing Cloudinary

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});
