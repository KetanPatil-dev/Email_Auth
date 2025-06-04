import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./connect.js";
import AuthRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9090;
app.use(express.json())
app.use(cookieParser())
const Start = async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`));
    app.use("/api/auth",AuthRoutes)
  } catch (error) {
    console.log("Start Error", error);
  }
};

Start()