import chipPrimary from "../../assets/Chip_Card_primary.svg";
import chipSecondary from "../../assets/Chip_Card_secondary.svg";

interface CreditCardItemProps {
  balance: number;
  cardHolderName: string;
  expirationDate: string;
  cardNumber: string;
  colorTheme: "primary" | "secondary";
}

const CreditCardItem = (props: CreditCardItemProps) => {
  const { balance, cardHolderName, expirationDate, cardNumber, colorTheme } =
    props;
  return (
    <div className="w-80 bg-white">
      <div className="flex flex-row">
        <div>
          <h3>Balance</h3>
          <p>{balance}</p>
        </div>
        <img
          src={colorTheme === "primary" ? chipPrimary : chipSecondary}
          alt="chip image"
          className="w-8 h-8"
        />
      </div>
      <div>
        <div>
          <h3>CARD HOLDER</h3>
          <p>{cardHolderName}</p>
        </div>
        <div>
          <h3>VALID THRU</h3>
          <p>{expirationDate}</p>
        </div>
      </div>
      <div>
        <p>{cardNumber}</p>
      </div>
    </div>
  );
};

export default CreditCardItem;
