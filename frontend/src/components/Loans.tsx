import React from 'react';
import {personalLoanIcon, corporateLoanIcon, bussinessLoanIcon, customLoanIcon} from '../utils/assetsGroup';

const LoansTopCardsData = [
  {
    icon : personalLoanIcon,
    title : "Personal Loans",
    amount : "$50,000"
  },
  {
    icon : corporateLoanIcon,
    title : "Corporate Loans",
    amount : "$100,000"
  },
  {
    icon : bussinessLoanIcon,
    title : "Business Loans",
    amount : "$500,000"
  },
  {
    icon : customLoanIcon,
    title : "Custom Loans",
    amount : "Choose Money"
  }
];

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

const Loans = () => {
  return (
  <div className="rounded-lg flex flex-col justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
         {LoansTopCardsData.map((each,index) => (
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-x-3" key={index}>
                <img src={each.icon} alt="total investment icon" />
                <div className="flex flex-col justify-start w-full">
                  <span className="text-[#718EBF] text-base font-normal">{each.title}</span>
                  <p className="text-[#232323] font-bold text-md">{each.amount}</p>
                </div>
            </div>
         ))}
    </div>
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
  </div>
  )
};

export default Loans;
