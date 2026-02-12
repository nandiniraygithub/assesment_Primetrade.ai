import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE || 'gmail',
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html,
    });

    console.log("📨 Email sent to:", email);
};
