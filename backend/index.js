import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cardRoutes from "./routes/card.route.js";
import investmentRoutes from "./routes/investment.route.js";
import loanRoutes from "./routes/loan.route.js";
import notifictaionRoutes from "./routes/notification.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Specific origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  credentials: true, // If you need to support cookies or auth headers
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.options("*", cors(corsOptions)); // Enable preflight for all routes

// Routes
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Welcome to Bank Dashboard Api" });
});

app.use(
  "/api",
  userRoutes,
  transactionRoutes,
  cardRoutes,
  notifictaionRoutes,
  loanRoutes,
  investmentRoutes
);

// Running Port of API
app.listen(5100, () => {
  console.log("API Running at http://localhost:5100");
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
