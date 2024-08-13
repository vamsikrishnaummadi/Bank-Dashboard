import React from 'react';
import { accountsSubscription,accountsService,accountsPerson1 } from './AccountIcons';

const transactions = [
    {
      icon: accountsSubscription,
      name: "Spotify Subscription",
      category: "Shopping",
      date: "25 Jan 2021",
      status: "Pending",
      amount: "-$150",
      amountColor: "text-red-500",
    },
    {
      icon: accountsService,
      name: "Mobile Service",
      category: "Service",
      date: "25 Jan 2021",
      status: "Completed",
      amount: "-$340",
      amountColor: "text-red-500",
    },
    {
      icon: accountsPerson1,
      name: "Emilly Wilson",
      category: "Transfer",
      date: "25 Jan 2021",
      status: "Completed",
      amount: "+$780",
      amountColor: "text-green-500",
    },
  ];

const LastTransaction = () => {
  return (
    <div className="w-full lg:w-4/6">
          <h3 className="text-lg font-semibold mb-2">Last Transaction</h3>
          <div className="bg-white rounded-xl shadow-md p-2">
            {transactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img className={`w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-2xl`}  src={transaction.icon}/>
                  <div>
                    <p className="font-medium text-[#333B69]">{transaction.name}</p>
                    <p className="text-[#718EBF] text-sm">{transaction.date}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <p className="hidden lg:block text-gray-500">{transaction.category}</p>
                  <p className="hidden lg:block text-gray-500">1234 ****</p>
                  <p className="hidden lg:block text-sm text-gray-500">{transaction.status}</p>
                  <p className={`text-sm ${transaction.amountColor}`}>{transaction.amount}</p>
                </div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default LastTransaction