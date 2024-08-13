import React from "react";
import { serviceLifeInsuranceIcon,serviceShoppingIcon, serviceSafetyIcon } from "./servicesIcons";


const serviceTopCardsData = [
    {
      icon : serviceLifeInsuranceIcon,
      title : "Life Insurance",
      caption : "Unlimited protection"
    },
    {
      icon : serviceShoppingIcon,
      title : "Shopping",
      caption : "Buy. Think. grow"
    },
    {
      icon : serviceSafetyIcon,
      title : "Safety",
      caption : "We are your allies"
    },
    
];

const TopCards:React.FC = () => {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {serviceTopCardsData.map((each,index) => (
              <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-x-3" key={index}>
                  <img src={each.icon} alt="total investment icon" />
                  <div className="flex flex-col justify-start w-full">
                        <p className="text-[#232323] text-md font-bold">{each.title}</p>
                        <span className="text-[#718EBF] font-normal text-base">{each.caption}</span>
                  </div>
              </div>
          ))}
      </div>
      )
};

export default TopCards;