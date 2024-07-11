import { errorHandler } from '../middlewares/error.js';
import LoanType from '../models/loanType.model.js';

// Create a LoanType
export const createLoanType = async (req, res, next) => {
    const { name, description, interestRate, maxAmount, minDuration, maxDuration } = req.body;

    try {
        const loanType = new LoanType({
            name,
            description,
            interestRate,
            maxAmount,
            minDuration,
            maxDuration
        });

        const savedLoanType = await loanType.save();
        res.status(201).json(savedLoanType);
    } catch (error) {
        console.log(error);
        next(errorHandler(500, "Failed to create loan type"));
    }
};

// Get all LoanTypes
export const getLoanTypes = async (req, res, next) => {
    try {
        const loanTypes = await LoanType.find().sort({ createdAt: -1 });
        res.status(200).json(loanTypes);
    } catch (error) {
        console.log(error);
        next(errorHandler(500, "Failed to retrieve loan types"));
    }
};

// Update a LoanType
export const updateLoanType = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, interestRate, maxAmount, minDuration, maxDuration } = req.body;

    try {
        const loanType = await LoanType.findByIdAndUpdate(
            id,
            { name, description, interestRate, maxAmount, minDuration, maxDuration },
            { new: true, runValidators: true, overwrite:true }
        );

        if (!loanType) {
            return next(errorHandler(404, "LoanType not found"));
        }

        res.status(200).json(loanType);
    } catch (error) {
        console.log(error);
        next(errorHandler(500, "Failed to update loan type"));
    }
};

// Delete a LoanType
export const deleteLoanType = async (req, res, next) => {
    const { id } = req.params;

    try {
        const loanType = await LoanType.findByIdAndDelete(id);

        if (!loanType) {
            return next(errorHandler(404, "LoanType not found"));
        }

        res.status(200).json({ message: "LoanType deleted successfully" });
    } catch (error) {
        console.log(error);
        next(errorHandler(500, "Failed to delete loan type"));
    }
};
