import { errorHandler } from '../middlewares/error.js';
import Loan from '../models/loan.model.js';

export const createLoan = async (req, res, next) => {
    const { accountNumber, amount, interestRate, duration, startDate, status } = req.body;

    try {
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + duration);

        const loan = new Loan({ accountNumber, amount, interestRate, duration, startDate, endDate, status });
        await loan.save();
        res.status(201).send(loan);
    } catch (error) {
        next(errorHandler(500, "Failed to create loan"));
    }
};

export const getLoans = async (req, res, next) => {
    const { accountNumber } = req.params;
    const { page = 1, limit = 10 } = req.query;
    console.log("getLoans called with accountNumber:", accountNumber);
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
            totalLoans
        });
    } catch (error) {
        next(errorHandler(500, "Failed to retrieve loans"));
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
            { new: true, overwrite: true}
        );

        if (!loan) {
            return next(errorHandler(404, "Loan not found"));
        }

        res.status(200).send(loan);
    } catch (error) {
        next(errorHandler(500, "Failed to update loan"));
    }
};

export const deleteLoan = async (req, res, next) => {
    const { id } = req.params;

    try {
        const loan = await Loan.findByIdAndDelete(id);
        if (!loan) {
            return next(errorHandler(404, "Loan not found"));
        }
        res.status(200).send({ message: "Loan deleted successfully" });
    } catch (error) {
        next(errorHandler(500, "Failed to delete loan"));
    }
};
