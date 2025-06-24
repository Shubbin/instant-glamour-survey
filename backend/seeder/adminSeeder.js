import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.models.js";

// Load .env from parent directory
dotenv.config({ path: '../.env' });

async function seedAdmin() {
  try {
    const username = "admin";
    const password = "makinde";
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log(`Admin "${username}" already exists`);
      process.exit();
    }

    // Hash the password before saving!
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();
    console.log(`Admin "${username}" created successfully`);
    process.exit();
  } catch (err) {
    console.error("Error creating admin:", err.message);
    process.exit(1);
  }
}

seedAdmin();