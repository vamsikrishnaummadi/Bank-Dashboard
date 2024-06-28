import express from "express";
import {
  createTransaction,
  getTransactionById,
  getTransactions,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/transactions/create", createTransaction);

router.post("/transactions/batch", getTransactions);

router.get("/transactions/:transactionId", getTransactionById);

export default router;
