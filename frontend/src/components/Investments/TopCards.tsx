import React from "react";
import { investmentNumber,investmentRate, investmentTotalIcon } from "./InvestmentIcons";

const TopCards: React.FC = () => {
   return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-x-3">
                <img src={investmentTotalIcon} alt="total investment icon" />
                <div className="flex flex-col justify-start w-full">
                    <span className="text-[#718EBF] text-base font-normal">Total Invested Amount</span>
                    <p className="text-[#232323] font-bold text-md">$150,000</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-x-3">
                <img src={investmentNumber} alt="total investment icon" />
                <div className="flex flex-col justify-start w-full">
                    <span className="text-[#718EBF] text-base font-normal">Number of Investments</span>
                    <p className="text-[#232323] font-bold text-md">1,250</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-x-3">
                <img src={investmentRate} alt="total investment icon" />
                <div className="flex flex-col justify-start w-full">
                    <span className="text-[#718EBF] text-base font-normal">Rate of Return</span>
                    <p className="text-[#232323] font-bold text-md">5.8%</p>
                </div>
            </div>
        </div>
   )
};

export default TopCards;