import Loan from '../models/loan.model';
import { errorHandler } from '../utils/errorhandler';


export const createLoan = async(req,res,next)=>{
    const {userId, amount, interestRate, duration, startDate} = req.body 

    try{
        const endDate = new Date(startDate) 
        endDate.setMonth(endDate.getMonth() + duration); 

        const loan = new Loan({userId, amount, interestRate, duration, startDate, endDate}); 
        await loan.save();  
        res.status(201).send(loan)
    } catch(error){
        next(errorHandler(500, "Failed to create loan"))
    }
}


export const getLoans = async (req, res, next) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    try {
        const loans = await Loan.find({ userId })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const totalLoans = await Loan.countDocuments({ userId });
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

export const deleteLoan = async (req, res, next) => {
    const { loanId } = req.params;

    try {
        const loan = await Loan.findByIdAndDelete(loanId);
        if (!loan) {
            return next(errorHandler(404, "Loan not found"));
        }
        res.status(200).send({ message: "Loan deleted successfully" });
    } catch (error) {
        next(errorHandler(500, "Failed to delete loan"));
    }
};

