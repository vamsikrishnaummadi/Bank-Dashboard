import { creditCardYellow } from "./cardIcons";

const cardsData = [
  {
    id: "card-1",
    cardType: "secondary",
    bank: "DBL Bank",
    cardNumber: "**** **** 5600",
    cardHolderName: "William",
  },
  {
    id: "card-2",
    cardType: "secondary",
    bank: "BRC Bank",
    cardNumber: "**** **** 4300",
    cardHolderName: "Michael",
  },
  {
    id: "card-3",
    cardType: "secondary",
    bank: "ABM Bank",
    cardNumber: "**** **** 7580",
    cardHolderName: "Edward",
  },
];

const CardList = () => {
  return (
    <div className="lg:ml-3 w-full lg:w-2/3 flex flex-col">
      <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-3">
        Cards List
      </h2>
      <div className="w-full flex flex-col justify-between grow gap-2">
        {cardsData.map((card) => (
          <div
            key={card?.id}
            className="w-full flex bg-white px-5 rounded-lg shadow justify-between items-center grow"
          >
            <div className="flex items-center">
              <img
                src={creditCardYellow}
                alt="transaction icon"
                className="w-10 h-10 mr-1"
              />
              <div>
                <h3 className="text-sm font-semibold text-[#232323]">
                  Card Type
                </h3>
                <p className="text-sm text-[#718EBF]">{card?.cardType}</p>
              </div>
            </div>
            <div className={`flex-col p-2 items-center lg:block`}>
              <div className="ml-2">
                <h3 className="text-sm font-semibold text-[#232323]">Bank</h3>
                <p className="text-sm text-[#718EBF]">{card.bank}</p>
              </div>
            </div>
            <div className={`flex-col p-2 items-center hidden xl:block`}>
              <div className="ml-2">
                <h3 className="text-sm font-semibold text-[#232323]">
                  Card Number
                </h3>
                <p className="text-sm text-[#718EBF]">{card.cardNumber}</p>
              </div>
            </div>
            <div className={`flex-col p-2 items-center lg:block`}>
              <div className="ml-2">
                <h3 className="text-sm font-semibold text-[#232323]">
                  Name on Card
                </h3>
                <p className="text-sm text-[#718EBF]">{card.cardHolderName}</p>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <button className="text-blue-500 border border-blue-500 p-2 rounded-3xl">
                view details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
