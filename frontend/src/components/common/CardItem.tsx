import { useLocation, useNavigate } from "react-router-dom";
import chipPrimary from "../../assets/Chip_Card_primary.svg";
import chipSecondary from "../../assets/Chip_Card_secondary.svg";

interface CreditCardItemProps {
  balance: number;
  cardHolderName: string;
  expirationDate: string;
  cardNumber: string;
  cardType: "debit" | "credit";
}

const primaryCardInfo = {
  labelColor: "text-[#ffffff]/70",
  textColor: "text-[#ffffff]",
  chipSVG: chipPrimary,
  containerClasses: "bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] mr-3 mt-3",
  cardNumberClasses: "bg-gradient-to-br from-[#ffffff]/15 to-[#ffffff]/0",
};

const secondaryCardInfo = {
  labelColor: "text-[#718ebf]",
  textColor: "text-[#343c6a]",
  chipSVG: chipSecondary,
  containerClasses: "bg-white mr-3 mt-3",
  cardNumberClasses: "border border-t-[#DFEAF2]",
};

const CardItem = (props: CreditCardItemProps) => {
  const { balance, cardHolderName, expirationDate, cardNumber, cardType } =
    props;

  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const balanceInUSD = balance.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: "USD",
  });

  const {
    labelColor,
    textColor,
    chipSVG,
    containerClasses,
    cardNumberClasses,
  } = cardType === "debit" ? primaryCardInfo : secondaryCardInfo;

  return (
    <div
      className={`mt-2 rounded-[20px] border border-[#DFEAF2] cursor-pointer ${containerClasses} flex flex-col justify-between min-w-64 ${
        path === "/payment-cards" ? "w-1/3" : "w-1/2"
      } sm:w-inherit`}
      style={{ aspectRatio: 1.5 }}
      onClick={() => navigate(`/card-details/${cardNumber}`)}
    >
      <div className="flex flex-col justify-around grow px-4 py-3">
        <h3
          className={`text-xs font-normal self-end ${labelColor} mb-1 tracking-widest`}
        >
          {cardType.toUpperCase()}
        </h3>
        <div className="flex justify-between">
          <div>
            <h3 className={`text-xs font-normal ${labelColor}`}>Balance</h3>
            <p className={`text-xs sm:text-sm mb-1 font-semibold ${textColor}`}>
              ${balanceInUSD}
            </p>
          </div>
          <img src={chipSVG} alt="chip image" className="w-7 lg:w-8 h-7" />
        </div>
        <div className="flex justify-between">
          <div className="grow">
            <h3
              className={`text-[10px] sm:text-[8px] md:text-[10px] font-normal ${labelColor}`}
            >
              CARD HOLDER
            </h3>
            <p className={`text-xs lg:text-sm font-semibold ${textColor}`}>
              {cardHolderName.toUpperCase()}
            </p>
          </div>
          <div className="grow">
            <h3
              className={`text-[10px] sm:text-[8px] md:text-[10px] font-normal ${labelColor}`}
            >
              VALID THRU
            </h3>
            <p className={`text-xs lg:text-sm font-semibold ${textColor}`}>
              {expirationDate}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`p-2 rounded-b-[20px] flex justify-between ${cardNumberClasses}`}
      >
        <p
          className={`text-xs sm:text-sm lg:text-base ml-2 text-center font-semibold ${textColor}`}
        >
          {cardNumber.slice(0, 4) + " **** **** " + cardNumber.slice(12)}
        </p>
        <div className="relative w-11 h-[30px] bg-transparent mr-2">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <div className="w-[30px] h-[30px] rounded-full bg-[#666C7A80]"></div>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <div className="w-[30px] h-[30px] rounded-full bg-[#9199AF80]"></div>
          </div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <div className="w-[30px] h-[30px] rounded-full bg-[#9199AF80]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
