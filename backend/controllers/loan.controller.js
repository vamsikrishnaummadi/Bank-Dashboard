import Loan from "../models/loan.model.js";
import CustomError from "../utils/customError.js";

export const createLoan = async (req, res, next) => {
  const { accountNumber, amount, interestRate, duration, startDate, status } =
    req.body;

  try {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + duration);

    const loan = new Loan({
      accountNumber,
      amount,
      interestRate,
      duration,
      startDate,
      endDate,
      status,
    });
    await loan.save();
    res.status(201).send(loan);
  } catch (error) {
    next(new CustomError(500, "Failed to create loan"));
  }
};

export const getLoans = async (req, res, next) => {
  const { accountNumber } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const loans = await Loan.find({ accountNumber })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalLoans = await Loan.countDocuments({ accountNumber });
    const totalPages = Math.ceil(totalLoans / limit);

    res.send({
      loans,
      totalPages,
      currentPage: parseInt(page),
      totalLoans,
    });
  } catch (error) {
    next(new CustomError(500, "Failed to retrieve loans"));
  }
};

export const updateLoan = async (req, res, next) => {
  const { id } = req.params;
  const { amount, interestRate, duration, startDate, status } = req.body;

  try {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + duration);

    const loan = await Loan.findByIdAndUpdate(
      id,
      { amount, interestRate, duration, startDate, endDate, status },
      { new: true }
    );

    if (!loan) {
      throw new CustomError(404, "Loan not found");
    }

    res.status(200).send(loan);
  } catch (error) {
    next(error);
  }
};

export const deleteLoan = async (req, res, next) => {
  const { id } = req.params;

  try {
    const loan = await Loan.findByIdAndDelete(id);
    if (!loan) {
      throw new CustomError(404, "Loan not found");
    }
    res.status(200).send({ message: "Loan deleted successfully" });
  } catch (error) {
    next(error);
  }
};
