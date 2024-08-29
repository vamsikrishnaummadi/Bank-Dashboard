import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{16}$/,
    },
    cardStatus: {
      type: String,
      required: true,
      enum: ["active", "blocked"],
    },
    cardType: {
      type: String,
      required: true,
      enum: ["debit", "credit"],
    },
    expirationDate: {
      type: String,
      required: true,
      match: /^(0[1-9]|1[0-2])\/\d{2}$/,
    },
    cardHolderName: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
      match: /^\d{3}$/,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    transactionLimit: {
      type: Number,
      required: true,
    },
    quickTransferLimit: {
      type: Number,
      required: true,
    },
    amountDue: { type: Number },
    rewardPoints: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("card", cardSchema);

export default Card;
