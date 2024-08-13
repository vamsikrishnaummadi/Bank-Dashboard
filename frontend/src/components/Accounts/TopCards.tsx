import { accountsMyBalance,accountsIncome,accountsExpense,accountsTotalSaving } from './AccountIcons';


const accountsTopCardsData = [
    {
      icon : accountsMyBalance,
      title : "My Balance",
      amount : "$12,750"
    },
    {
      icon : accountsIncome,
      title : "Income",
      amount : "$5,600"
    },
    {
      icon : accountsExpense,
      title : "Expense",
      amount : "$3,460"
    },
    {
      icon : accountsTotalSaving,
      title : "Total Saving",
      amount : "$7,920"
    }
  ];

const TopCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {accountsTopCardsData?.map((each,index) => (
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-x-3" key={index}>
                <img src={each?.icon} alt="total investment icon" />
                <div className="flex flex-col justify-start w-full">
                <span className="text-[#718EBF] text-base font-normal">{each?.title}</span>
                <p className="text-[#232323] font-bold text-md">{each?.amount}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default TopCards