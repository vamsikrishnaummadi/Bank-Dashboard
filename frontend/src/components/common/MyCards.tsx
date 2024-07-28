import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CreditCardItem from "./CreditCardItem";

interface MyCardsProps {
  limit: number | null;
}

const MyCards = (props: MyCardsProps) => {
  const location = useLocation();
  const path = location.pathname;
  const { limit } = props;
  console.log({ limit });

  const [cardsList, setCardsList] = useState<any[]>([{}, {}]);

  useEffect(() => {
    fetch(`/api/cards?page=1${limit && "&limit=" + limit}`)
      .then((res) =>
        res.json().then((parsedRes) => {
          if (parsedRes.success) {
            setCardsList(parsedRes.data);
          }
        })
      )
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  return (
    <div className="flex-flex-column bg-red-300">
      <div className="flex flex-row">
        <h2>My Cards</h2>
        {limit &&
          (path === "/transactions" ? (
            <button>+ Add Card</button>
          ) : (
            <button>See All</button>
          ))}
      </div>
      <div className="flex flex-row">
        {cardsList.map((card: any, index) => {
          const {
            balance = 0,
            expirationDate = "12/28",
            cardHolderName = "Dasari Prashanth",
            cardNumber = "3788 **** **** 1234",
          } = card;
          const colorTheme = index === 0 ? "primary" : "secondary";
          return (
            <CreditCardItem
              {...{
                balance,
                expirationDate,
                cardHolderName,
                cardNumber,
                colorTheme,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyCards;
