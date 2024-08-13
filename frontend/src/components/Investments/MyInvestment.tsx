import React from "react";
import { investmentAppleIcon,investmentTeslaIcon, investmentSamsungIcon } from "./InvestmentIcons";

const MyInvestment:React.FC = () => {
    return (
      <div className="rounded-lg col-span-2 w-full lg:w-3/5">
            <h2 className="text-xl font-bold mb-4 text-[#333B69]">My Investment</h2>
            <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                        <div className="flex items-center">
                              <img src={investmentAppleIcon} alt="Apple" className="w-10 h-10" />
                              <div className="ml-4">
                                    <h3 className="text-md font-semibold">Apple Store</h3>
                                    <p className="text-[#718EBF] text-sm">E-commerce, Marketplace</p>
                              </div>
                        </div>
                        <div className="text-center">
                              <p className="text-md font-semibold">54000</p>
                              <p className="text-[#718EBF] text-sm">Envestment value</p>
                        </div>
                        <div className="text-right">
                              <p className="text-green-500">+16%</p>
                              <p className="text-[#718EBF] text-sm">Return Value</p>
                        </div>
                  </div>
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                        <div className="flex items-center">
                              <img src={investmentSamsungIcon} alt="Samsung" className="w-10 h-10" />
                              <div className="ml-4">
                                    <h3 className="text-md font-semibold">Samsung Mobile</h3>
                                    <p className="text-[#718EBF] text-sm">E-commerce, Marketplace</p>
                              </div>
                        </div>
                        <div className="text-center">
                              <p className="text-md font-semibold">25300</p>
                              <p className="text-[#718EBF] text-sm">Envestment value</p>
                        </div>
                        <div className="text-right">
                              <p className="text-red-500">-4%</p>
                              <p className="text-[#718EBF] text-sm">Return Value</p>
                        </div>
                  </div>
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                        <div className="flex items-center">
                              <img src={investmentTeslaIcon} alt="Tesla" className="w-10 h-10" />
                              <div className="ml-4">
                                    <h3 className="text-md font-semibold">Tesla Motors</h3>
                                    <p className="text-[#718EBF] text-sm">Electric Vehicles</p>
                              </div>
                        </div>
                        <div className="text-center">
                              <p className="text-md font-semibold">8200</p>
                              <p className="text-[#718EBF] text-sm">Envestment value</p>
                        </div>
                        <div className="text-right">
                              <p className="text-green-500">+25%</p>
                              <p className="text-[#718EBF] text-sm">Return Value</p>
                        </div>
                  </div>
            </div>
      </div>
    )
};

export default MyInvestment;