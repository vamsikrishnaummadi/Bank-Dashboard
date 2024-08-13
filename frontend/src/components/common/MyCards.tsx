import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../store/store";
import { getCards } from "../../utils/apiService";
import CardItem from "./CardItem";

interface MyCardsProps {
  limit: number | null;
}

interface Card {
  balance: number;
  expirationDate: string;
  cardHolderName: string;
  cardNumber: string;
  cardType: "debit" | "credit";
}

const MyCards = (props: MyCardsProps) => {
  const user = useSelector((state: RootState) => state.user.userData.user);
  const { accountNumber } = user;

  const location = useLocation();
  const path = location.pathname;
  const { limit } = props;
  console.log({ limit });

  const [cardsList, setCardsList] = useState<Card[]>([]);

  useEffect(() => {
    getCards(accountNumber, limit).then((res) => {
      if (res.success) {
        setCardsList(res.data);
      }
    });
  }, []);

  return (
    <div
      className={`${
        path === "/payment-cards" ? "w-11/12" : "w-11/12 lg:w-2/3"
      } mb-5 lg:mb-4`}
    >
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
        <div className="items-center sm:items-start flex grow overflow-x-auto">
          {cardsList.map((card, index) => {
            const {
              balance,
              expirationDate,
              cardHolderName,
              cardType,
              cardNumber,
            } = card;
            return (
              <CardItem
                key={index}
                {...{
                  balance,
                  expirationDate,
                  cardHolderName,
                  cardNumber,
                  cardType,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyCards;
