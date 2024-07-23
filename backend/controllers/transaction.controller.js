import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import CustomError from "../utils/customError.js";

export const createTransaction = async (req, res, next) => {
  const session = await mongoose.startSession();
  const { amount, type, accountNumber } = req.body;
  try {
    session.startTransaction();
    if (!accountNumber) {
      throw new CustomError(400, "Account Number is required!");
    }
    if (amount <= 0) {
      throw new CustomError(400, "Amount should be greater than zero!");
    }
    const user = await User.findOne({ accountNumber }, { balance: 1 }).session(
      session
    );
    if (!user) {
      throw new CustomError(404, "This Account does not exist");
    }
    let balanceAfter;
    if (type === "expense" || type === "investment") {
      balanceAfter = user.balance - amount;
      if (balanceAfter < 0) {
        throw new CustomError(
          "transaction declined due to insufficient funds."
        );
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
    next(err);
  } finally {
    await session.endSession();
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
      throw new CustomError(404, "Transction not found!");
    }
    res.status(200).json({ success: true, data: transaction });
  } catch (err) {
    next(err);
  }
};
