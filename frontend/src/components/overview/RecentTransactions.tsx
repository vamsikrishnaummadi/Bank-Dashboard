import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { customFetch } from "../../utils/apiService";
import {
  creditCardYellowCircle,
  dollarIcon,
  paypalIcon,
} from "./overviewIcons";

const staticTransactions = [
  {
    icon: creditCardYellowCircle,
    description: "Deposit from my card",
    createdAt: "January 21, 2024",
    type: "debit",
    amount: 850,
  },
  {
    icon: paypalIcon,
    description: "Deposit Paypal",
    createdAt: "January 25, 2024",
    type: "credit",
    amount: 2500,
  },
  {
    icon: dollarIcon,
    description: "Jemi Wilson",
    createdAt: "March 03, 2024",
    type: "credit",
    amount: 5400,
  },
];

const RecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const userData = useSelector((state: RootState) => state?.user?.userData);

  useEffect(() => {
    if (userData?.accountNumber) {
      customFetch("api/transactions?page=1&limit=3", "POST", {
        accountNumber: userData.accountNumber,
      }).then((res) => {
        if (res.success && res.data.length > 0) {
          const formattedTransaction = res.data.map(
            (item: any, index: number) => ({
              ...item,
              icon: staticTransactions[index].icon,
              createdAt: new Date(item.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            })
          );
          setRecentTransactions(formattedTransaction);
        } else {
          setRecentTransactions(staticTransactions);
        }
      });
    }
  }, [userData?.accountNumber]);

  return (
    <div className="w-4/5 lg:w-1/3">
      <div className="lg:ml-3 mb-5 lg:mb-4">
        <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
          Recent Transactions
        </h2>
        <ul className="bg-white border rounded-2xl lg:rounded-3xl flex flex-col justify-between py-4 w-full sm:w-4/5 lg:w-full sm:m-auto">
          {recentTransactions.map((transaction, index) => {
            const amountInUSD = transaction.amount.toLocaleString("en-US", {
              style: "decimal",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              currency: "USD",
            });
            return (
              <li className="grid grid-cols-4 m-3 justify-start" key={index}>
                <div className="w-10 h-10">
                  <img
                    src={transaction.icon}
                    alt="transaction icon"
                    className="w-10 h-10"
                  />
                </div>
                <div className="col-span-2">
                  <p className="text-sm lg:text-md font-medium">
                    {transaction.description}
                  </p>
                  <p className="text-xs lg:text-sm font-normal">
                    {transaction.createdAt}
                  </p>
                </div>
                <div className="justify-self-end">
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
