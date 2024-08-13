import { useState, useEffect } from "react";
import MultipleCards from "../common/MultipleCards";
import LastTransaction from "./LastTransaction";
import TopCards from "./TopCards";
import DebitAndCreditOverview from "./DebitAndCreditOverview";
import InvoiceSent from "./InvoiceSent";

const Accounts = () => {
const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.matchMedia("(min-width: 1024px)").matches);

  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.matchMedia("(min-width: 1024px)").matches;
      setIsLargeScreen(largeScreen);
    };

    // Set the initial adjustedLimit
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLargeScreen]);

    return (
        <div className="rounded-lg flex flex-col justify-center gap-4">
             <TopCards />
             <div className="w-full flex flex-wrap lg:flex-nowrap gap-4 mb-4">
                <LastTransaction />
                <MultipleCards limit={isLargeScreen ? 1 : 2} customWidth="w-full lg:w-2/6 h-[200px]"/>
             </div>
             <div className="w-full mt-3 flex gap-3 flex-wrap lg:flex-nowrap mb-8">
                 <DebitAndCreditOverview />
                 <InvoiceSent /> 
             </div>
        </div>
    )
};

export default Accounts;
