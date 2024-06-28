import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  balanceAfter: {
    type: Number,
    required: true,
  },
  cardId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  invoice: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model("transaction", transactionSchema);

export default Transaction;
