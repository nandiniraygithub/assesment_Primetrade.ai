import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, message, res) => {
  // 1️⃣ Create JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" } // token valid for 7 days
  );

  // 2️⃣ Send token in cookie and response
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true, // prevents client JS access
      secure: process.env.NODE_ENV === "production", // send only over HTTPS in prod
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};
