// models/Investment.js
import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
    accountNumber: {
        type: Number,
        required: true
    },
    investmentType: {
        type: String,
        enum: ['Stocks', 'Bonds', 'Real Estate', 'Mutual Funds', 'Other'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    companyName: {
        type: String,
        required: true
    },
    returnPercentage: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Investment = mongoose.model('Investment', investmentSchema);

export default Investment;
