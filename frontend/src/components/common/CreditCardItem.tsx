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
  containerClasses: "bg-gradient-to-r from-[#4C49ED] to-[#0A06F4]",
  cardNumberClasses: "bg-gradient-to-br from-[#ffffff]/15 to-[#ffffff]/0",
};

const secondaryCardInfo = {
  labelColor: "text-[#718ebf]",
  textColor: "text-[#343c6a]",
  chipSVG: chipSecondary,
  containerClasses: "ml-3 bg-white",
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
      className={`w-52 lg:w-60 inline-block rounded-[20px] border border-[#DFEAF2] ${containerClasses}`}
    >
      <div className="p-5">
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
        <div className="flex flex-row justify-between">
          <div>
            <h3
              className={`text-[10px] sm:text-[8px] md:text-[10px] font-normal ${labelColor}`}
            >
              CARD HOLDER
            </h3>
            <p className={`text-xs lg:text-sm font-semibold ${textColor}`}>
              {cardHolderName}
            </p>
          </div>
          <div>
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

      <div className={`p-2 rounded-b-[20px] ${cardNumberClasses}`}>
        <p
          className={`text-xs sm:text-sm lg:text-base ml-2 font-semibold ${textColor}`}
        >
          {cardNumber}
        </p>
      </div>
    </div>
  );
};

export default CreditCardItem;
