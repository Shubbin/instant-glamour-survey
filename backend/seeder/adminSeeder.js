import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.models.js";

// Load .env from parent directory
dotenv.config({ path: '../.env' });

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Admin.findOne({ username: "Admin" });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = new Admin({
      username: "Admin",
      password: "makinde",
    });

    await admin.save();
    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.error("Error creating admin:", err.message);
    process.exit(1);
  }
}

seedAdmin();