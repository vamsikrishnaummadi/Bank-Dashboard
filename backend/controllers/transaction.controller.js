import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import CustomError from "../utils/customError.js";

export const createTransaction = async (req, res, next) => {
  const { amount, cardNumber, userName, accountNumber, paymentType } = req.body;
  console.log("reqbody", req.body);

  const errorMessage = userName
    ? accountNumber
      ? paymentType === "quick-transfer" || cardNumber
        ? amount
          ? amount > 0
            ? ""
            : "Amount should be greater than zero!"
          : "Amount is required!"
        : "Card Number is required!"
      : "Account Number is required!"
    : "Username is required!";
  if (errorMessage) {
    throw new CustomError(400, errorMessage);
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const sender = await User.findOne(
      { accountNumber },
      { balance: 1 }
    ).session(session);
    if (!sender) {
      throw new CustomError(404, "This Account does not exist");
    }
    const reciever = await User.findOne(
      { userName },
      { balance: 1, accountNumber: 1 }
    ).session(session);
    if (!reciever) {
      throw new CustomError(404, "This reciever does not exist!");
    }

    let balanceAfter = sender.balance - amount;
    if (balanceAfter < 0) {
      throw new CustomError("Transaction declined due to insufficient funds.");
    }
    const debit = new Transaction({
      ...req.body,
      balanceAfter,
      accountNumber,
      type: "debit",
    });
    const debitSave = await debit.save({ session });
    console.log({ debitSave });

    sender.balance -= amount;
    await sender.save({ session });

    const credit = new Transaction({
      ...req.body,
      balanceAfter: reciever.balance + amount,
      accountNumber: reciever.accountNumber,
      type: "credit",
    });
    const creditSave = await credit.save({ session });
    console.log({ creditSave });
    reciever.balance += amount;
    await reciever.save({ session });

    await session.commitTransaction();
    res.status(200).json({ success: true, data: debit });
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
