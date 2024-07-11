import bcrypt from "bcryptjs";
import { errorHandler } from "../middlewares/error.js";
import Card from "../models/card.model.js";
import User from "../models/user.model.js";
import { generateCardNumber } from "../utils/cardNumber.js";
import { calculateExpirationDate } from "../utils/expirationDate.js";

export const createCard = async (req, res, next) => {
  const { accountNumber, cardHolderName } = req.body;

  try {
    if (!accountNumber) {
      throw new Error("Account number is required!");
    }
    if (!cardHolderName) {
      throw new Error("Card holder name is required!");
    }
    const user = await User.findOne({ accountNumber });
    if (!user) {
      throw new Error("This account does not exist!");
    }
    const cardNumber = await generateCardNumber();
    const expirationDate = calculateExpirationDate(Date.now());
    const cvv = Math.floor(100 + Math.random() * 900).toString();
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedPin = bcrypt.hashSync(pin, 10);
    console.log({ hashedPin });

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
    next(errorHandler(400, err.message));
  }
};

export const getCards = async (req, res, next) => {
  const { accountNumber } = req.body;
  const { page = 1, limit = 10 } = req.query;
  const query = accountNumber ? { accountNumber } : null;
  try {
    const cards = await Card.find(query)
      .sort({ createdAt: 1 })
      .limit(limit)
      .skip((page - 1) * limit);
    res.status(200).json({ success: true, data: cards });
  } catch (err) {
    next(errorHandler(400, err.message));
  }
};

export const getCardByCardNumber = async (req, res, next) => {
  const { cardNumber } = req.params;
  try {
    if (!cardNumber) {
      throw new Error("Card Number is required!");
    }
    const card = await Card.findOne({ cardNumber });
    if (!card) {
      return next(404, errorHandler("Card not found"));
    }
    res.status(200).json({ success: true, data: card });
  } catch (err) {
    next(errorHandler(err.message));
  }
};

export const deleteCard = async (req, res, next) => {
  const { cardNumber } = req.params;
  try {
    if (!cardNumber) {
      throw new Error("Card Number is required!");
    }
    const card = await Card.findOneAndDelete({ cardNumber });
    if (!card) {
      return next(404, errorHandler("Card not found!"));
    }
    res.status(200).json({
      success: true,
      message: "Card deleted successfully.",
      data: card,
    });
  } catch (err) {
    next(errorHandler(err.message));
  }
};
