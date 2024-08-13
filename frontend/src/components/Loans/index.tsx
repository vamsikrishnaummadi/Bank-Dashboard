import React from "react";
import TopCards from "./TopCards";
import ActiveLoansOverview from "./ActiveLoansOverview";


const Loans:React.FC = () => {
    return (
        <div className="rounded-lg flex flex-col justify-center">
            <TopCards />
            <ActiveLoansOverview />
        </div>
    )
};

export default Loans;