import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../store/store";
import { customFetch } from "../../utils/apiService";
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
  amountDue: number;
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const MyCards = (props: MyCardsProps) => {
  const userData = useSelector((state: RootState) => state?.user?.userData);

  const location = useLocation();
  const path = location.pathname;
  const { limit } = props;

  const [cardsList, setCardsList] = useState<Card[]>([]);

  useEffect(() => {
    if (userData?.accountNumber) {
      customFetch(
        `${apiBaseUrl}/cards?page=1${limit && "&limit=" + limit}`,
        "POST",
        {
          accountNumber: userData.accountNumber,
        }
      ).then((res) => {
        if (res.success) {
          setCardsList(res.data);
        }
      });
    }
  }, [userData?.accountNumber]);

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
              amountDue,
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
                  amountDue,
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
