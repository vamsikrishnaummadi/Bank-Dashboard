import mongoose from 'mongoose';
import { errorHandler } from '../middlewares/error.js';
import Loan from '../models/loan.model.js';
import LoanType from '../models/loanType.model.js';
// Create a Loan
export const createLoan = async (req, res, next) => {
    const { accountNumber, amount, interestRate, duration, startDate, status, loanType } = req.body;

    try {
        // Validate LoanType ID
        if (!mongoose.Types.ObjectId.isValid(loanType)) {
            return next(errorHandler(400, "Invalid loanType ID"));
        }

        // Check if LoanType exists
        const loanTypeExists = await LoanType.findById(loanType);
        if (!loanTypeExists) {
            return next(errorHandler(404, "LoanType not found"));
        }

        // Calculate end date
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + duration);

        // Create loan
        const loan = new Loan({ accountNumber, amount, interestRate, duration, startDate, endDate, status, loanType });
        const saveLoan = await loan.save();
        res.status(201).json(saveLoan);
    } catch (error) {
        next(errorHandler(500, "Failed to create loan"));
    }
};

// Get all Loans by Account Number
export const getLoans = async (req, res, next) => {
    const { accountNumber } = req.params;
    const { page = 1, limit = 10 } = req.query;

    try {
        const loans = await Loan.find({ accountNumber })
            .populate('loanType', 'name')
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

// Update a Loan
export const updateLoan = async (req, res, next) => {
    const { loanId } = req.params;
    const { amount, interestRate, duration, startDate, status, loanType } = req.body;

    try {
        // Validate Loan ID
        if (!mongoose.Types.ObjectId.isValid(loanId)) {
            console.log("Invalid loan ID:", loanId);
            return next(errorHandler(400, "Invalid loan ID"));
        }

        // Check if Loan exists
        const loan = await Loan.findById(loanId);
        if (!loan) {
            console.log("Loan not found for ID:", loanId);
            return next(errorHandler(404, "Loan not found"));
        }

        // Validate LoanType ID (if provided)
        if (loanType) {
            if (!mongoose.Types.ObjectId.isValid(loanType)) {
                console.log("Invalid loanType ID:", loanType);
                return next(errorHandler(400, "Invalid loanType ID"));
            }

            // Check if LoanType exists
            const loanTypeExists = await LoanType.findById(loanType);
            if (!loanTypeExists) {
                console.log("LoanType not found for ID:", loanType);
                return next(errorHandler(404, "LoanType not found"));
            }
        }

        // Calculate end date
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + duration);

        // Update loan
        const updatedLoan = await Loan.findByIdAndUpdate(
            loanId,
            { amount, interestRate, duration, startDate, endDate, status, loanType },
            { new: true }  
        );
        
        if (!updatedLoan) {
            return next(errorHandler(404, "Loan not found"));
        }

        res.status(200).send(updatedLoan);
    } catch (error) {
        console.log(error);
        next(errorHandler(500, "Failed to update loan"));
    }
};


// Delete a Loan
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
