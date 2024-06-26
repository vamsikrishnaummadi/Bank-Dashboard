import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import transactionRoutes from "./routes/transaction.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Welcome to Bank Dashboard Api" });
});

app.use("/api", userRoutes, transactionRoutes);

// Running Port of API
app.listen(5000, () => {
  console.log("API Running at http://localhost:5000");
});

// mongodb database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Succefully connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware to handle errors
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.send({
    success: false,
    statusCode,
    message,
  });
});
