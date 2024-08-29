import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    balanceAfter: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["debit", "credit"],
    },
    paymentType: {
      type: String,
      required: true,
      enum: ["card-to-account", "quick-transfer"],
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    cardNumber: {
      type: String,
      unique: true,
      default: null,
      match: /^\d{16}$/,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transaction", transactionSchema);

export default Transaction;
