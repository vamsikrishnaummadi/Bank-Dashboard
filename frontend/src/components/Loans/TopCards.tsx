import React from "react";
import { loanBussinessIcon, loanCustomIcon, loanPersonalIcon, loancorporateIcon } from "./LoanIcons";

const LoansTopCardsData = [
    {
      icon : loanPersonalIcon,
      title : "Personal Loans",
      amount : "$50,000"
    },
    {
      icon : loancorporateIcon,
      title : "Corporate Loans",
      amount : "$100,000"
    },
    {
      icon : loanBussinessIcon,
      title : "Business Loans",
      amount : "$500,000"
    },
    {
      icon : loanCustomIcon,
      title : "Custom Loans",
      amount : "Choose Money"
    }
  ];

const TopCards: React.FC = () => {
     return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {LoansTopCardsData.map((each,index) => (
                <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-x-3" key={index}>
                    <img src={each.icon} alt="total investment icon" />
                    <div className="flex flex-col justify-start w-full">
                        <span className="text-[#718EBF] text-base font-normal">{each.title}</span>
                        <p className="text-[#232323] font-bold text-md">{each.amount}</p>
                    </div>
                </div>
            ))}
        </div>
     )
};

export default TopCards;