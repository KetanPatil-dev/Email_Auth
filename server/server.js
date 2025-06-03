import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./connect.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9090;

const Start = async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`));
  } catch (error) {
    console.log("Start Error", error);
  }
};

Start()