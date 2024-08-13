import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SingleCard from "./SingleCard";

interface MyCardsProps {
  limit: number | null;
  customWidth : string | null;
}

interface Card {
  balance: number;
  expirationDate: string;
  cardHolderName: string;
  cardNumber: string;
}

const MultipleCards = (props: MyCardsProps) => {
  const location = useLocation();
  const path = location.pathname;
  const { limit , customWidth} = props;

  const [cardsList, setCardsList] = useState<Card[]>([]);

  useEffect(() => {
    fetch(`/api/cards?page=1${limit && "&limit=" + limit}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountNumber: 568134727900 }),
    })
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
  }, [limit]);

  return (
    <div className={customWidth ? customWidth : "w-11/12 lg:w-2/3 mb-5 lg:mb-4"}>
      <div>
        <div className="mb-2 flex justify-between">
          <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-0.5">
            My Cards
          </h2>
          {limit &&
            (path === "/transactions" ? (
              <button className="text-xs sm:text-sm lg:text-base text-[#343C6A] font-semibold mr-3.5">
                + Add Card
              </button>
            ) : (
              <button className="text-xs sm:text-sm lg:text-base text-[#343C6A] font-semibold mr-3.5">
                See All
              </button>
            ))}
        </div>
        <div className="flex items-center overflow-x-scroll scrollbar-none">
          {cardsList.map((card, index) => {
            const { balance, expirationDate, cardHolderName } = card;
            const cardNumber =
              card.cardNumber.slice(0, 4) +
              " **** **** " +
              card.cardNumber.slice(12);
            const colorTheme = index === 0 ? "primary" : "secondary";
            return (
              <SingleCard
                key={index}
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
    </div>
  );
};

export default MultipleCards;
