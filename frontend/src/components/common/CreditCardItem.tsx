import chipPrimary from "../../assets/Chip_Card_primary.svg";
import chipSecondary from "../../assets/Chip_Card_secondary.svg";

interface CreditCardItemProps {
  balance: number;
  cardHolderName: string;
  expirationDate: string;
  cardNumber: string;
  colorTheme: "primary" | "secondary";
}

const primaryCardInfo = {
  labelColor: "text-[#ffffff]/70",
  textColor: "text-[#ffffff]",
  chipSVG: chipPrimary,
  containerClasses: "bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] mr-3",
  cardNumberClasses: "bg-gradient-to-br from-[#ffffff]/15 to-[#ffffff]/0",
};

const secondaryCardInfo = {
  labelColor: "text-[#718ebf]",
  textColor: "text-[#343c6a]",
  chipSVG: chipSecondary,
  containerClasses: "sm:ml-3 bg-white mr-3 mt-3 sm:mt-0",
  cardNumberClasses: "border border-t-[#DFEAF2]",
};

const CreditCardItem = (props: CreditCardItemProps) => {
  const { balance, cardHolderName, expirationDate, cardNumber, colorTheme } =
    props;

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
  } = colorTheme === "primary" ? primaryCardInfo : secondaryCardInfo;

  return (
    <div
      className={`rounded-[20px] border border-[#DFEAF2] ${containerClasses} flex flex-col grow justify-between w-10/12 min-[480px]:w-3/5 sm:w-inherit`}
      style={{ aspectRatio: 1.5 }}
    >
      <div className="flex flex-col justify-around grow p-5">
        <div className="flex justify-between">
          <div>
            <h3 className={`text-xs font-normal ${labelColor}`}>Balance</h3>
            <p className={`text-xs sm:text-sm mb-1 font-semibold ${textColor}`}>
              ${balanceInUSD}
            </p>
          </div>
          <img
            src={chipSVG}
            alt="chip image"
            className="w-7 lg:w-8 h-7 lg:w-8"
          />
        </div>
        <div className="flex justify-between">
          <div className="grow">
            <h3
              className={`text-[10px] sm:text-[8px] md:text-[10px] font-normal ${labelColor}`}
            >
              CARD HOLDER
            </h3>
            <p className={`text-xs lg:text-sm font-semibold ${textColor}`}>
              {cardHolderName}
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
          {cardNumber}
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

export default CreditCardItem;
