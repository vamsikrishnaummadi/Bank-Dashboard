import express from "express";
import { getInvestmentsByAccountNumber, createInvestment, getInvestments, updateInvestment, deleteInvestments , getInvestmentStatistics} from "../controllers/investment.controller.js";

const router = express.Router();

router.route("/investments")
    .post(createInvestment)   // Path: "/api/investments"
    .get(getInvestments);      // Path: "/api/investments" 

router.route("/investments/:accountNumber")
    .get(getInvestmentsByAccountNumber)    // Path: "/api/investments/256789471234"
    .put(updateInvestment)
    .delete(deleteInvestments);

router.route("/investments/statistics/:accountNumber").get(getInvestmentStatistics);   // Path: "/api/investments/statistics/256789471234"

export default router;
