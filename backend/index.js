import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5757;
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("HomePage");
});

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await ConnectDB(process.env.MONGO_URL);
    console.log("✅ Database connected. Starting server...");


    app.listen(PORT, () => console.log(`🚀 Server running on PORT: ${PORT}`));
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
  }
};

startServer();
