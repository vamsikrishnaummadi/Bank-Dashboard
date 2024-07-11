import express from 'express';
import { createLoan, deleteLoan, getLoans, updateLoan } from '../controllers/loan.controller.js';

const router = express.Router();

// Create a Loan
router.post('/loans', createLoan);

// Get all Loans by Account Number
router.get('/loans/:accountNumber', getLoans);

// Update a Loan
router.put('/loans/:loanId', updateLoan);

// Delete a Loan
router.delete('/loans/:id', deleteLoan);

export default router;
