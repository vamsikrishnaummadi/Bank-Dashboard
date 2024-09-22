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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.

  next();
});

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
