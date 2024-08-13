import React from "react";
import TopCards from "./TopCards";
import BankServiceList from "./BankServiceList";

const Services:React.FC = () => {
    return (
        <div className="rounded-lg flex flex-col justify-center">
            <TopCards />
            <BankServiceList />
        </div>
    )
};

export default Services;