export const generateEmailTemplate = (resetPasswordUrl) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; background:#000; color:#fff; padding:20px;">
      <h2 style="text-align:center;">Reset Your Password</h2>

      <p>You requested to reset your password.</p>

      <div style="text-align:center; margin:20px 0;">
        <a href="${resetPasswordUrl}"
           style="padding:12px 20px; background:#fff; color:#000; text-decoration:none;">
          Reset Password
        </a>
      </div>

      <p>This link will expire in 15 minutes.</p>

      <p>${resetPasswordUrl}</p>

      <p style="font-size:12px; color:#aaa;">— Ecommerce Team</p>
    </div>
  `;
};
