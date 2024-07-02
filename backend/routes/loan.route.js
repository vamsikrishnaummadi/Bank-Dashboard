
import express from 'express';
import { createLoan, getLoans, updateLoan, deleteLoan } from '../controllers/loan.controller.js';

const router = express.Router();

router.post('/', createLoan);
router.get('/', getLoans);
router.put('/:id', updateLoan);
router.delete('/:id', deleteLoan);

export default router;
