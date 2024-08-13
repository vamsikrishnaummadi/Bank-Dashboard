import React from "react";
import TopCards from "./TopCards";
import YearlyTotalInvestment from "./YearlyTotalInvestment";
import MonthlyRevenue from "./MonthlyRevenue";
import MyInvestment from "./MyInvestment";
import TrendingStock from "./TrendingStock";

const Investments: React.FC = () => {
    return (
        <div className="rounded-lg flex flex-col justify-center">
            <TopCards />
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
               <YearlyTotalInvestment />
               <MonthlyRevenue />
            </div>
            <div className="w-full flex flex-wrap lg:flex-nowrap gap-2 mb-20">
               <MyInvestment />
               <TrendingStock />
            </div>
        </div>
    )
};

export default Investments; 