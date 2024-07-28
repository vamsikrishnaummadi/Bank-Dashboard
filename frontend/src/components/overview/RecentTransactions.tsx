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
    <div className="w-4/5 sm:w-1/2 lg:w-1/3">
      <div className="lg:ml-3 mb-5 lg:mb-4">
        <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
          Recent Transactions
        </h2>
        <ul
          className="bg-white border rounded-2xl lg:rounded-3xl flex flex-col justify-between py-4"
          style={{ aspectRatio: 1.5 }}
        >
          {recentTransactions.map((transaction, index) => {
            const amountInUSD = transaction.amount.toLocaleString("en-US", {
              style: "decimal",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              currency: "USD",
            });
            return (
              <li className="flex flex-row mx-3 justify-between" key={index}>
                <div className={`w-7 lg:w-8 bg-[${transaction.icon_bg}]`}>
                  <img
                    src={transaction.icon}
                    alt="transaction icon"
                    className="w-4 lg:w-5"
                  />
                </div>
                <div>
                  <p className="text-sm lg:text-md font-medium">
                    {transaction.description}
                  </p>
                  <p className="text-xs lg:text-sm font-normal">
                    {transaction.transactionDate}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-sm lg:text-lg font-medium ${
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
    </div>
  );
};

export default RecentTransactions;
