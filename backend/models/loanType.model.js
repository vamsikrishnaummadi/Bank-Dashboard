import mongoose from 'mongoose';

const loanTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    maxAmount: {
        type: Number,
        required: true,
    },
    minDuration: {
        type: Number,
        required: true,
    },
    maxDuration: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model('LoanType', loanTypeSchema);
