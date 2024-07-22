import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import CustomError from "../utils/customError.js";

export const createTransaction = async (transactionData, session) => {
  const { amount, type, accountNumber } = transactionData;
  try {
    const user = await User.findOne({ accountNumber }, { balance: 1 }).session(
      session
    );
    let balanceAfter;
    if (type === "expense" || type === "investment") {
      balanceAfter = user.balance - amount;
      if (balanceAfter < 0) {
        throw new CustomError(
          400,
          "Transaction declined due to insufficient funds."
        );
      }
    } else {
      balanceAfter = user.balance + amount;
    }
    const transaction = new Transaction({ ...transactionData, balanceAfter });
    const document = await transaction.save({ session });
    user.balance = balanceAfter;
    await user.save({ session });
    return document;
  } catch (err) {
    throw err;
  }
};
