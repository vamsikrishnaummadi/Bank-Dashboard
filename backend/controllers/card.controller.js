import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Card from "../models/card.model.js";
import User from "../models/user.model.js";
import { generateCardNumber } from "../utils/cardNumber.js";
import CustomError from "../utils/customError.js";
import { calculateExpirationDate } from "../utils/expirationDate.js";

export const createCard = async (req, res, next) => {
  const {
    accountNumber,
    cardHolderName,
    cardNumber = await generateCardNumber(),
    expirationDate = calculateExpirationDate(Date.now()),
  } = req.body;
  try {
    if (!accountNumber) {
      throw new CustomError(400, "Account number is required!");
    }
    if (!cardHolderName) {
      throw new CustomError(400, "Card holder name is required!");
    }
    const user = await User.findOne({ accountNumber });
    if (!user) {
      throw new CustomError(404, "This Account does not exist!");
    }
    const cvv = Math.floor(100 + Math.random() * 900).toString();
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedPin = bcrypt.hashSync(pin, 10);

    const card = new Card({
      ...req.body,
      cardNumber,
      expirationDate,
      cvv,
      blockCard: false,
      pin: hashedPin,
    });
    const savedCard = await card.save();
    res.status(200).json({
      success: true,
      message: "Card Created Successfully",
      data: savedCard,
    });
  } catch (err) {
    next(err);
  }
};

export const getCards = async (req, res, next) => {
  const { accountNumber } = req.body;
  const { page = 1, limit = 10 } = req.query;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (!accountNumber) {
      throw new CustomError(400, "Account Number is required!");
    }
    const user = await User.findOne({ accountNumber }, { balance: 1 }).session(
      session
    );
    if (!user) {
      throw new CustomError(404, "This Account does not exist!");
    }
    const cards = await Card.find({ accountNumber })
      .sort({ createdAt: 1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .session(session);
    const updatedCards = cards.map((card) => {
      const newCard = card.toObject();
      newCard.balance = user.balance;
      return newCard;
    });
    await session.commitTransaction();
    res.status(200).json({ success: true, data: updatedCards });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
};

export const getCardByCardNumber = async (req, res, next) => {
  const { cardNumber } = req.params;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const card = await Card.findOne({ cardNumber });
    if (!card) {
      throw new CustomError(404, "This Card does not exist!");
    }

    const accountNumber = card.accountNumber;
    const user = await User.findOne({ accountNumber }, { balance: 1 });
    const updatedCard = card.toObject();
    updatedCard.balance = user.balance;
    session.commitTransaction();
    res.status(200).json({ success: true, data: updatedCard });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
};

export const updateCard = async (req, res, next) => {
  const { cardNumber } = req.params;
  try {
    const card = await Card.findOneAndUpdate(
      { cardNumber },
      { $set: req.body },
      { new: true }
    );
    if (!card) {
      throw new CustomError(404, "This Card does not exist!");
    }
    res.status(200).json({
      success: true,
      message: "Card updated successfully.",
      data: card,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCard = async (req, res, next) => {
  const { cardNumber } = req.params;
  try {
    const card = await Card.findOneAndDelete({ cardNumber });
    if (!card) {
      throw new CustomError(404, "This Card does not exist!");
    }
    res.status(200).json({
      success: true,
      message: "Card deleted successfully.",
      data: card,
    });
  } catch (err) {
    next(err);
  }
};
