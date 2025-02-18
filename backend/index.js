import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.js";

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5757;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HomePage");
});

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await ConnectDB(process.env.MONGO_URL);
    console.log("✅ Database connected. Starting server...");

    app.use("/api/auth", authRoutes);

    app.listen(PORT, () => console.log(`🚀 Server running on PORT: ${PORT}`));
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
  }
};

startServer();
