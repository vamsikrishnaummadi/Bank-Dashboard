import { useEffect, useState } from "react";
import iconBlue from "../../assets/icon_blue_rt.svg";
import iconGreen from "../../assets/icon_green_rt.svg";
import iconYellow from "../../assets/icon_yellow_rt.svg";

const RecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  useEffect(() => {
    // fetch("api/transactions?page=1&limit=3").then((res) =>
    //   res.json().then((parsedRes) => {
    //     if (parsedRes.success) {
    //       console.log("rt: " + parsedRes.data);
    //       setRecentTransactions(parsedRes.data);
    //     }
    //   })
    // );
    const staticTransactions = [
      {
        icon: iconYellow,
        icon_bg: "#FFF5D9",
        description: "Deposit from my",
        transactionDate: "28 january 2021",
        type: "expense",
        amount: 850,
      },
      {
        icon: iconBlue,
        icon_bg: "#E7EDFF",
        description: "Deposit Paypal",
        transactionDate: "25 January 2021",
        type: "income",
        amount: 2500,
      },
      {
        icon: iconGreen,
        icon_bg: "#DCFAF8",
        description: "Jemi Wilson",
        transactionDate: "21 January 2021",
        type: "income",
        amount: 5400,
      },
    ];
    setRecentTransactions(staticTransactions);
  }, []);

  return (
    <div className="xl:mr-5 ml-5 ml-0 mt-5 sm:mt-0 md:mt-3 lg:mt-0">
      <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
        Recent Transactions
      </h2>
      <ul className="w-52 lg:w-60 bg-white mt-1 border rounded-2xl lg:rounded-3xl">
        {recentTransactions.map((transaction, index) => {
          const amountInUSD = transaction.amount.toLocaleString("en-US", {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            currency: "USD",
          });
          return (
            <li className="flex flex-row m-3 justify-between" key={index}>
              <div className={`w-7 lg:w-8 bg-[${transaction.icon_bg}]`}>
                <img
                  src={transaction.icon}
                  alt="transaction icon"
                  className="w-4 lg:w-5"
                />
              </div>
              <div>
                <p className="text-xs lg:text-sm font-medium">
                  {transaction.description}
                </p>
                <p className="text-[10px] lg:text-xs font-normal">
                  {transaction.transactionDate}
                </p>
              </div>
              <div>
                <p
                  className={`text-xs lg:text-base font-medium ${
                    transaction.type === "income"
                      ? "text-[#41D4A8]"
                      : "text-[#FF4B4A]"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}${amountInUSD}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentTransactions;
