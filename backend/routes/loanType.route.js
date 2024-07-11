import express from 'express';
import { createLoanType, getLoanTypes, updateLoanType, deleteLoanType } from '../controllers/loanType.controller.js';

const router = express.Router();

// Create a LoanType
router.post('/loan-types', createLoanType);

// Get all LoanTypes
router.get('/loan-types', getLoanTypes);

// Update a LoanType
router.put('/loan-types/:id', updateLoanType);

// Delete a LoanType
router.delete('/loan-types/:id', deleteLoanType);

export default router;
