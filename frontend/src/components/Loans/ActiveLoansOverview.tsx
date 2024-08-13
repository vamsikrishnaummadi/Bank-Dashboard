import React from "react";

const loans = [
    { id: 1, loanMoney: '$100,000', leftToRepay: '$40,500', duration: '8 Months', interestRate: '12%', installment: '$2,000 / month' },
    { id: 2, loanMoney: '$500,000', leftToRepay: '$250,000', duration: '36 Months', interestRate: '10%', installment: '$8,000 / month' },
    { id: 3, loanMoney: '$900,000', leftToRepay: '$40,500', duration: '12 Months', interestRate: '12%', installment: '$5,000 / month' },
    { id: 4, loanMoney: '$50,000', leftToRepay: '$40,500', duration: '25 Months', interestRate: '5%', installment: '$2,000 / month' },
    { id: 5, loanMoney: '$50,000', leftToRepay: '$40,500', duration: '5 Months', interestRate: '16%', installment: '$10,000 / month' },
    { id: 6, loanMoney: '$80,000', leftToRepay: '$25,500', duration: '14 Months', interestRate: '8%', installment: '$2,000 / month' },
    { id: 7, loanMoney: '$12,000', leftToRepay: '$5,500', duration: '9 Months', interestRate: '13%', installment: '$500 / month' },
    { id: 8, loanMoney: '$160,000', leftToRepay: '$100,800', duration: '3 Months', interestRate: '12%', installment: '$900 / month' },
];

const ActiveLoansOverview:React.FC = () => {
    return (
        <div className="p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Active Loans Overview</h2>
            <table className="min-w-full bg-white rounded-lg">
                <thead className='text-[#718EBF]'>
                    <tr>
                        <th className="text-left p-4 hidden sm:table-cell">SL No</th>
                        <th className="text-left p-4">Loan Money</th>
                        <th className="text-left p-4">Left to Repay</th>
                        <th className="text-left p-4 hidden lg:table-cell">Duration</th>
                        <th className="text-left p-4 hidden lg:table-cell">Interest Rate</th>
                        <th className="text-left p-4 hidden sm:table-cell">Installment</th>
                        <th className="text-left p-4">Repay</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan, index) => (
                        <tr key={loan.id} className="border-b">
                            <td className="p-4 hidden sm:table-cell">{String(index + 1).padStart(2, '0')}.</td>
                            <td className="p-4">{loan.loanMoney}</td>
                            <td className="p-4">{loan.leftToRepay}</td>
                            <td className="p-4 hidden lg:table-cell">{loan.duration}</td>
                            <td className="p-4 hidden lg:table-cell">{loan.interestRate}</td>
                            <td className="p-4 hidden sm:table-cell">{loan.installment}</td>
                            <td className="p-4">
                                <button className="hover:text-[#1814F3] border border-black hover:border-[#1814F3] hover:font-semibold rounded-2xl px-4 py-1 transition">
                                Repay
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td className="p-4 hidden sm:table-cell text-red-500 font-bold">Total</td>
                        <td className='p-4 text-red-500 font-bold'>$125,0000</td>
                        <td className="p-4 text-red-500 font-bold">$750,000</td>
                        <td className='p-4 hidden lg:table-cell'></td>
                        <td className='p-4 hidden lg:table-cell'></td>
                        <td className="p-4 hidden sm:table-cell text-red-500 font-bold text-right">$50,000 / month</td>
                        <td className='p-4'></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ActiveLoansOverview;