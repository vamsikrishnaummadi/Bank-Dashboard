import {totalInvestmentIcon, numberOfInvestmentIcon, rateOfReturnIcon} from "../utils/assetsGroup";

const Investments = () => {
  return (
       <div className="rounded-lg flex flex-col justify-center">
            <div className="flex items-center justify-center gap-5 w-full flex-wrap">
                  <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 w-full sm:w-56 md:w-60 lg:w-72">
                        <img src={totalInvestmentIcon} alt="total investment icon" />
                        <div className="flex flex-col justify-start">
                           <span>Total Invested Amount</span>
                           <p>$150,000</p>
                        </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 w-full sm:w-56 md:w-60 lg:w-72">
                        <img src={numberOfInvestmentIcon} alt="total investment icon" />
                        <div className="flex flex-col justify-start">
                           <span>Number of Investments</span>
                           <p>1,250</p>
                        </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 w-full sm:w-56 md:w-60 lg:w-72">
                        <img src={rateOfReturnIcon} alt="total investment icon" />
                        <div className="flex flex-col justify-start">
                           <span>Rate of Return</span>
                           <p>5.8%</p>
                        </div>
                  </div>
            </div>
            <div>

            </div>
            <div>

            </div>
       </div>
  )
};

export default Investments;
