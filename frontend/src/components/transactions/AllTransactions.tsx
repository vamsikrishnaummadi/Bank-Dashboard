import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { customFetch } from "../../utils/apiService";
import Pagination from "../common/Pagination";
import TransactionListItem from "./TransactionListItem";
import TransactionRow from "./TransactionRow";

const tabNames = ["All Transactions", "Income", "Expense"];
const headers = ["Description", "Type", "Card", "Date", "Amount", "Reciept"];

const transactions = [
  {
    transactionId: "1",
    description: "Grocery Store",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-15T14:32:00Z",
    amount: 45.67,
  },
  {
    transactionId: "2",
    description: "Online Subscription",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-16T09:12:00Z",
    amount: 12.99,
  },
  {
    transactionId: "3",
    description: "Salary",
    type: "credit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-15T08:00:00Z",
    amount: 2500.0,
  },
  {
    transactionId: "4",
    description: "Utility Bill",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-17T15:45:00Z",
    amount: 75.2,
  },
  {
    transactionId: "5",
    description: "Coffee Shop",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-18T11:10:00Z",
    amount: 5.5,
  },
  {
    transactionId: "6",
    description: "Electronics Store",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-19T18:30:00Z",
    amount: 299.99,
  },
  {
    transactionId: "7",
    description: "Restaurant",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-20T20:00:00Z",
    amount: 60.25,
  },
  {
    transactionId: "8",
    description: "Gym Membership",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-21T06:45:00Z",
    amount: 45.0,
  },
  {
    transactionId: "9",
    description: "Book Store",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-22T14:20:00Z",
    amount: 24.99,
  },
  {
    transactionId: "10",
    description: "Gas Station",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-23T07:30:00Z",
    amount: 30.0,
  },
  {
    transactionId: "11",
    description: "Hotel",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-24T16:50:00Z",
    amount: 120.75,
  },
  {
    transactionId: "12",
    description: "Airline Ticket",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-25T10:00:00Z",
    amount: 450.0,
  },
  {
    transactionId: "13",
    description: "Pharmacy",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-26T13:15:00Z",
    amount: 20.3,
  },
  {
    transactionId: "14",
    description: "Gift Shop",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-27T17:40:00Z",
    amount: 15.0,
  },
  {
    transactionId: "15",
    description: "ATM Withdrawal",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-28T09:00:00Z",
    amount: 100.0,
  },
  {
    transactionId: "16",
    description: "Refund",
    type: "credit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-29T14:00:00Z",
    amount: 30.0,
  },
  {
    transactionId: "17",
    description: "Grocery Store",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-15T14:32:00Z",
    amount: 45.67,
  },
  {
    transactionId: "18",
    description: "Online Subscription",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-16T09:12:00Z",
    amount: 12.99,
  },
  {
    transactionId: "19",
    description: "Salary",
    type: "credit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-15T08:00:00Z",
    amount: 2500.0,
  },
  {
    transactionId: "20",
    description: "Utility Bill",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-17T15:45:00Z",
    amount: 75.2,
  },
  {
    transactionId: "21",
    description: "Coffee Shop",
    type: "debit",
    cardNumber: "1234567891234567",
    createdAt: "2024-01-18T11:10:00Z",
    amount: 5.5,
  },
];

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const AllTransactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransactions, setAllTransactions] = useState<any[]>([]);
  const userData = useSelector((state: RootState) => state?.user?.userData);

  useEffect(() => {
    if (userData.accountNumber) {
      customFetch(`${apiBaseUrl}/transactions`, "POST", {
        accountNumber: userData.accountNumber,
      }).then((res) => {
        if (res.success && res.data.length > 0) {
          setAllTransactions(res.data);
        } else {
          setAllTransactions(transactions);
        }
      });
    }
  }, [userData.accountNumber]);

  const currentTransactions = allTransactions.slice(
    currentPage,
    currentPage + 5
  );

  return (
    <div>
      <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2 mt-4">
        All Transactions
      </h2>
      <div className="w-full flex-col">
        <TabGroup>
          <TabList className="flex gap-4">
            {tabNames.map((name) => (
              <Tab
                key={name}
                className="py-1 px-3 text-sm/5 lg:text-base/5 font-medium text-[#718EBF] data-[selected]:text-[#1814F3] data-[selected]:border-b-[3px] data-[selected]:border-solid data-[selected]:border-[#1814F3] focus:outline-none focus:border-b-3 focus:border-solid focus:border-[#1814F3]"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3">
            {tabNames.map((_) => (
              <TabPanel>
                <div className="hidden lg:block">
                  <table className="w-full bg-white mt-3 rounded-xl p-2">
                    <thead className="m-3">
                      <tr className="m-3">
                        {headers.map((header) => (
                          <th
                            scope="col"
                            className="whitespace-nowrap text-[#718EBF] font-medium text-left px-2 py-4"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentTransactions.map((transaction) => (
                        <TransactionRow transaction={transaction} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="lg:hidden bg-white rounded-xl p-2 w-full sm:w-4/5">
                  <ul>
                    {currentTransactions.map((transaction) => (
                      <TransactionListItem transaction={transaction} />
                    ))}
                  </ul>
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
        <div className="w-full sm:w-4/5 lg:w-full">
          <Pagination
            itemsPerPage={5}
            totalItems={transactions.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllTransactions;
