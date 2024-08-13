import React from 'react';
import { accountsApple,accountsPerson1,accountsPerson2, accountsPlaystation } from './AccountIcons';

interface Invoice {
    id: number;
    icon: string;
    name: string;
    time: string;
    amount: string;
}

const invoices: Invoice[] = [
    { id: 1, icon: accountsApple, name: "Apple Store", time: "5h ago", amount: "$450" },
    { id: 2, icon: accountsPerson1, name: "Michael", time: "2 days ago", amount: "$160" },
    { id: 3, icon: accountsPlaystation, name: "Playstation", time: "5 days ago", amount: "$1085" },
    { id: 4, icon: accountsPerson2, name: "William", time: "10 days ago", amount: "$90" },
];

const InvoiceSent:React.FC = () => {
  return (
    <div className="flex flex-col w-full lg:w-2/6">
        <h2 className="text-xl font-bold mb-4">Invoices Sent</h2>
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4">
            {invoices.map(invoice => (
                <div key={invoice.id} className="flex items-center justify-between p-2">
                    <div className="flex items-center">
                        <img src={invoice.icon} alt={invoice.name} className="w-10 h-10 rounded-full mr-4" />
                        <div>
                            <p className="font-medium text-[#B1B1B1]">{invoice.name}</p>
                            <p className="text-sm text-[#718EBF]">{invoice.time}</p>
                        </div>
                    </div>
                    <p className="text-md text-[#718EBF] font-semibold">{invoice.amount}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default InvoiceSent;