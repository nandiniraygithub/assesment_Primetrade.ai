import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./model/user.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");

        const email = "admin@gmail.com";
        const passwordRaw = "123456";
        const hashedPassword = await bcrypt.hash(passwordRaw, 10);

        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            console.log("Admin account exists. Updating password/role...");
            existingAdmin.password = hashedPassword;
            existingAdmin.role = "admin";
            await existingAdmin.save();
            console.log("Admin account updated.");
        } else {
            console.log("Creating new Admin account...");
            await User.create({
                name: "Admin",
                email,
                password: hashedPassword,
                role: "admin"
            });
            console.log("Admin account created.");
        }
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
