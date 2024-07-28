import {
  serviceBusinessLoanIcon, 
  serviceCheckingAccountIcon,
  serviceDebitAndCreditIcon,
  serviceLifeInsuranceIcon,
  serviceSafetyIcon,
  serviceSavingsAccountIcon,
  serviceShoppingIcon
}  from "../utils/servicesIcons";

const serviceTopCardsData = [
  {
    icon : serviceLifeInsuranceIcon,
    title : "Life Insurance",
    caption : "Unlimited protection"
  },
  {
    icon : serviceShoppingIcon,
    title : "Shopping",
    caption : "Buy. Think. grow"
  },
  {
    icon : serviceSafetyIcon,
    title : "Safety",
    caption : "We are your allies"
  },
  
];

const bankServices = [
  {
    id: 1,
    icon: serviceSavingsAccountIcon,
    name: 'Savings Account',
    description: 'A safe place to save your money with attractive interest rates.',
    specifications: [
      { feature: 'Interest Rate', value: '3.5% per annum' },
      { feature: 'Minimum Balance', value: '$500' },
      { feature: 'ATM Withdrawals', value: 'Unlimited' }
    ],
    detailsUrl: '/services/savings-account'
  },
  {
    id: 2,
    icon: serviceDebitAndCreditIcon,
    name: 'Credit Card',
    description: 'Credit cards with rewards and cash back offers.',
    specifications: [
      { feature: 'Credit Limit', value: 'Up to $10,000' },
      { feature: 'Annual Fee', value: '$100' },
      { feature: 'Rewards', value: '1.5% cash back on all purchases' }
    ],
    detailsUrl: '/services/credit-card'
  },
  {
    id: 3,
    icon: serviceShoppingIcon,
    name: 'Mortgage',
    description: 'Affordable mortgage options for buying your dream home.',
    specifications: [
      { feature: 'Loan Term', value: 'Up to 30 years' },
      { feature: 'Interest Rate', value: '4% per annum' },
      { feature: 'Down Payment', value: '20%' }
    ],
    detailsUrl: '/services/mortgage'
  },
  {
    id: 4,
    icon: serviceBusinessLoanIcon,
    name: 'Personal Loan',
    description: 'Quick and easy personal loans with flexible repayment options.',
    specifications: [
      { feature: 'Loan Amount', value: 'Up to $50,000' },
      { feature: 'Interest Rate', value: '5% per annum' },
      { feature: 'Repayment Period', value: 'Up to 5 years' }
    ],
    detailsUrl: '/services/personal-loan'
  },
  {
    id: 5,
    icon: serviceCheckingAccountIcon,
    name: 'Checking Account',
    description: 'A convenient account for everyday transactions.',
    specifications: [
      { feature: 'Monthly Fee', value: '$10' },
      { feature: 'Overdraft Protection', value: 'Available' },
      { feature: 'Online Banking', value: 'Included' }
    ],
    detailsUrl: '/services/checking-account'
  },
  {
    id: 6,
    icon: serviceBusinessLoanIcon,
    name: 'Business Loan',
    description: 'Financing solutions to help your business grow.',
    specifications: [
      { feature: 'Loan Amount', value: 'Up to $100,000' },
      { feature: 'Interest Rate', value: '6% per annum' },
      { feature: 'Repayment Period', value: 'Up to 7 years' }
    ],
    detailsUrl: '/services/business-loan'
  },
  {
    id: 7,
    icon: serviceLifeInsuranceIcon,
    name: 'Insurance',
    description: 'Comprehensive insurance coverage for life, health, and property.',
    specifications: [
      { feature: 'Life Insurance', value: 'Term and whole life options' },
      { feature: 'Health Insurance', value: 'Individual and family plans' },
      { feature: 'Property Insurance', value: 'Home and auto coverage' }
    ],
    detailsUrl: '/services/insurance'
  },
  {
    id: 8,
    icon: serviceCheckingAccountIcon,
    name: 'Student Loan',
    description: 'Flexible loans to help you finance your education.',
    specifications: [
      { feature: 'Loan Amount', value: 'Up to $20,000' },
      { feature: 'Interest Rate', value: '4.5% per annum' },
      { feature: 'Grace Period', value: '6 months after graduation' }
    ],
    detailsUrl: '/services/student-loan'
  },
  {
    id: 9,
    icon: serviceDebitAndCreditIcon,
    name: 'Retirement Plan',
    description: 'Plan for a secure and comfortable retirement.',
    specifications: [
      { feature: 'Contribution Limits', value: 'Up to $19,500 per year' },
      { feature: 'Tax Benefits', value: 'Tax-deferred growth' },
      { feature: 'Withdrawals', value: 'Penalty-free after age 59½' }
    ],
    detailsUrl: '/services/retirement-plan'
  },
  {
    id: 10,
    icon: serviceSavingsAccountIcon,
    name: 'Investment Account',
    description: 'Invest in stocks, bonds, and mutual funds with professional guidance.',
    specifications: [
      { feature: 'Minimum Investment', value: '$1,000' },
      { feature: 'Management Fee', value: '1% per annum' },
      { feature: 'Account Access', value: '24/7 online access' }
    ],
    detailsUrl: '/services/investment-account'
  },
  {
    id: 11,
    icon: serviceLifeInsuranceIcon,
    name: 'Life Insurance',
    description: 'Secure your family’s future with our comprehensive life insurance plans.',
    specifications: [
      { feature: 'Coverage Amount', value: 'Up to $1,000,000' },
      { feature: 'Policy Term', value: '10, 20, or 30 years' },
      { feature: 'Premium Payment', value: 'Flexible payment options' }
    ],
    detailsUrl: '/services/life-insurance'
  }
];



const Services = () => {
  return (
    <div className="rounded-lg flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {serviceTopCardsData.map((each,index) => (
              <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-x-3" key={index}>
                  <img src={each.icon} alt="total investment icon" />
                  <div className="flex flex-col justify-start w-full">
                    <p className="text-[#232323] text-md font-bold">{each.title}</p>
                    <span className="text-[#718EBF] font-normal text-base">{each.caption}</span>
                  </div>
              </div>
          ))}
      </div>
      <div className="mb-11">
      <h2 className="text-2xl font-bold mb-6">Bank Services List</h2>
      <div className="space-y-4 w-full">
        {bankServices.map(service => (
          <div key={service?.id} className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <img src={service?.icon} alt={service?.name} className="w-10 h-10 mr-4" />
              <div>
                <h3 className="text-sm font-semibold text-[#232323]">{service?.name}</h3>
                <p className="text-sm text-[#718EBF]">{service?.description?.slice(0,18)}..</p>
              </div>
            </div>
            {service?.specifications?.map((each,index)=> 
              <div className={`flex-col p-2 items-center ${index === 0 ? 'max-sm:hidden' : "hidden"} lg:block`}>
                <div key={each?.feature} className="ml-2">
                  <h3 className="text-sm font-semibold text-[#232323]">{each?.feature}</h3>
                  <p className="text-sm text-[#718EBF]">{each?.value?.slice(0,20)}</p>
                </div>
              </div>
            )}
            <div className="flex justify-end items-center">
              <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded-3xl w-32 sm:w-36">
                view details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
};

export default Services;
