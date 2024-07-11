import mongoose from "mongoose";
import { errorHandler } from "../middlewares/error.js";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

export const createTransaction = async (req, res, next) => {
  const session = await mongoose.startSession();
  const { amount, type, accountNumber } = req.body;
  try {
    session.startTransaction();
    const user = await User.findOne({ accountNumber }, { balance: 1 }).session(
      session
    );
    let balanceAfter;
    if (type === "expense" || type === "investment") {
      balanceAfter = user.balance - amount;
      if (balanceAfter < 0) {
        throw new Error("transaction declined due to insufficient funds.");
      }
    } else {
      balanceAfter = user.balance + amount;
    }
    const transaction = new Transaction({ ...req.body, balanceAfter });
    const document = await transaction.save({ session });
    user.balance = balanceAfter;
    await user.save({ session });
    await session.commitTransaction();
    res.status(200).json({ success: true, data: document });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    next(errorHandler(400, err));
  } finally {
    session.endSession();
  }
};

export const getTransactions = async (req, res, next) => {
  const {
    accountNumber,
    type,
    fromDate = new Date("2024-01-01"),
    toDate = Date.now(),
  } = req.body;
  const { page = 1, limit = 25, orderby = "descending" } = req.query;
  const query = {
    ...(accountNumber ? { accountNumber } : null),
    ...(type ? { type } : null),
    createdAt: {
      $gte: fromDate,
      $lte: toDate,
    },
  };
  try {
    const transactions = await Transaction.find(query)
      .sort({ createdAt: orderby === "descending" ? -1 : 1 })
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await Transaction.countDocuments();
    res
      .status(200)
      .json({ success: true, count, page, limit, data: transactions });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getTransactionById = async (req, res, next) => {
  const { transactionId } = req.params;
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return next(errorHandler(404, "transaction not found"));
    }
    res.status(200).json({ success: true, data: transaction });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
