import mongoose from "mongoose";
import { createTransaction } from "../middlewares/createTransactionHelper.js";
import Investment from "../models/investment.model.js";
import CustomError from "../utils/customError.js";

// Get all investments
export const getInvestments = async (req, res, next) => {
  try {
    const { page = 1, limit = 25 } = req.query;
    const investments = await Investment.find()
      .limit(parseInt(limit))
      .skip((page - 1) * limit);
    const count = await Investment.countDocuments();
    res.status(200).json({
      success: true,
      data: investments,
      total: count,
      limit,
      page,
    });
  } catch (err) {
    next(err);
  }
};

// Get a single investment by ID
export const getInvestmentsByAccountNumber = async (req, res, next) => {
  const { accountNumber } = req.params;

  try {
    const investment = await Investment.find({ accountNumber });

    if (!investment) {
      throw new CustomError(404, "Investment not found");
    }

    res.status(200).json({
      success: true,
      data: investment,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new investment
export const createInvestment = async (req, res, next) => {
  const investment = req.body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create and save the investment
    const newInvestment = new Investment(investment);
    const savedInvestment = await newInvestment.save({ session });

    // Create the transaction
    const transactionData = {
      amount: investment.amount,
      type: "investment",
      accountNumber: investment.accountNumber,
      cardId: investment.cardId,
      invoice: "Invested Certain amount",
      description: investment.description,
    };
    await createTransaction(transactionData);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      data: { Investment: savedInvestment },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

// Update an existing investment
export const updateInvestment = async (req, res, next) => {
  const { investmentId } = req.params;
  const updateFields = req.body;

  try {
    const updatedInvestment = await Investment.findByIdAndUpdate(
      investmentId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedInvestment) {
      throw new CustomError(404, "Investment not found");
    }

    res.status(200).json({
      success: true,
      data: updatedInvestment,
    });
  } catch (err) {
    next(err);
  }
};

// Delete an investment
export const deleteInvestments = async (req, res, next) => {
  const { accountNumber } = req.params;
  try {
    const deletedInvestment = await Investment.deleteMany({ accountNumber });

    if (!deletedInvestment) {
      throw new CustomError(404, "Investments not found");
    }

    res.status(200).json({
      success: true,
      data: `All investments with this account Numner ${accountNumber} deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const getInvestmentStatistics = async (req, res, next) => {
  const { accountNumber } = req.params;
  try {
    const investments = await Investment.find({ accountNumber });

    if (investments.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          totalAmountInvested: 0,
          numberOfInvestments: 0,
          averageReturnPercentage: 0,
          yearlyTotalInvestment: [],
          monthlyRevenue: [],
        },
      });
    }

    const totalAmountInvested = investments.reduce(
      (sum, investment) => sum + investment.amount,
      0
    );
    const numberOfInvestments = investments.length;
    const averageReturnPercentage =
      investments.reduce(
        (sum, investment) => sum + investment.returnPercentage,
        0
      ) / numberOfInvestments;

    // Calculate yearly total investment
    const yearlyTotalInvestment = investments.reduce((acc, investment) => {
      const year = investment.date.getFullYear();
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += investment.amount;
      return acc;
    }, {});

    // Calculate monthly revenue
    const monthlyRevenue = investments.reduce((acc, investment) => {
      const year = investment.date.getFullYear();
      const month = investment.date.getMonth() + 1;
      const key = `${year}-${month < 10 ? "0" : ""}${month}`;
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += investment.amount * (investment.returnPercentage / 100);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        totalAmountInvested,
        numberOfInvestments,
        averageReturnPercentage,
        yearlyTotalInvestment,
        monthlyRevenue,
      },
    });
  } catch (err) {
    next(err);
  }
};
