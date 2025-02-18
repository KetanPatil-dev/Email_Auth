import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const ConnectDB = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL) throw new Error("MONGO_URL is not defined in .env file");

    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB Connected Successfully...");
  } catch (error) {
    console.error("❌ MongoDB Connection ERROR:", error.message);
    process.exit(1); // Exit if connection fails
  }
};

export default ConnectDB;
