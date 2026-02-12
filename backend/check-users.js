import mongoose from "mongoose";
import User from "./model/user.js";
import dotenv from "dotenv";

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");

        const users = await User.find({});
        console.log(`Found ${users.length} users:`);
        users.forEach(u => console.log(`- ${u.email} (${u.role})`));

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUsers();
