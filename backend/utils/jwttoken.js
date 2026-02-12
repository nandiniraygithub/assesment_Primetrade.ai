import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, message, res) => {
  const token = jwt.sign(
    { id: user.id },  // payload
    process.env.JWT_SECRET_KEY,  // secret key
    { expiresIn: process.env.JWT_EXPIRE_IN || "1d" }  // token validity
  );

  res
    .status(statusCode)
    .cookie("token", token, {   // set token as cookie
      expires: new Date(
        Date.now() +
          Number(process.env.COOKIE_EXPIRES_IN || 1) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .json({
      success: true,
      user,
      message,
      token,  // also send token in JSON response
    });
};
