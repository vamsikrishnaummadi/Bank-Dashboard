import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cardRoutes from "./routes/card.route.js";
import investmentRoutes from "./routes/investment.route.js";
import loanRoutes from "./routes/loan.route.js";
import notifictaionRoutes from "./routes/notification.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import userRoutes from "./routes/user.route.js";
import loanTypes from "./routes/loanType.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Welcome to Bank Dashboard Api" });
});

app.use("/api", userRoutes, transactionRoutes, notifictaionRoutes, loanRoutes, investmentRoutes);

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
