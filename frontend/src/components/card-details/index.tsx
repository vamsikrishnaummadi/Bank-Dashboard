import { hashSync } from "bcryptjs";
import { Key, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { customFetch } from "../../utils/apiService";
import { SetValuesProps } from "../payment-cards/AddNewCard";
import PaymentPopup from "./PaymentPopup";
import PinChangeForm from "./PinChangeForm";
import TransactionLimitForm from "./TransactionLimitForm";

interface DetailsItemProps {
  heading: String;
  content: String | Number;
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const CardDetails = () => {
  const [cardData, setCardData] = useState(null);

  const location = useLocation();
  const { pathname } = location;
  const cardNumber = pathname.slice(pathname.lastIndexOf("/") + 1);

  useEffect(() => {
    customFetch(`${apiBaseUrl}/cards/${cardNumber}`).then((res) => {
      if (res.success) {
        setCardData(res.data);
      }
    });
  }, []);

  if (!cardData) {
    return null;
  }

  const {
    cardHolderName,
    cardType,
    cardStatus,
    expirationDate,
    cvv,
    pin,
    transactionLimit,
    amountDue,
    rewardPoints,
  } = cardData;

  const handleBlockCard = async () => {
    const res = await customFetch(`${apiBaseUrl}/cards/${cardNumber}`, "PUT", {
      cardStatus: cardStatus === "active" ? "blocked" : "active",
    });
    if (res.success) {
      setCardData(res.data);
    }
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting, setStatus, resetForm }: SetValuesProps
  ) => {
    const prop = values.pin
      ? { pin: hashSync(values.newPin.join("")) }
      : values;
    const res = await customFetch(`${apiBaseUrl}/cards/${cardNumber}`, "PUT", {
      ...prop,
    });
    if (res.success) {
      setStatus("Card updated successfully!");
      setTimeout(() => {
        resetForm();
        setStatus("");
        setCardData(res.data);
      }, 2000);
    }
    setSubmitting(false);
  };

  const cardDetailsLeftData = [
    {
      heading: "Card Number",
      content: cardNumber.slice(0, 4) + " **** **** " + cardNumber.slice(12),
    },
    { heading: "Card Holder Name", content: cardHolderName },
    { heading: "Card Type", content: cardType },
    { heading: "Card Status", content: cardStatus },
    { heading: "Expiry Date", content: expirationDate },
    { heading: "CVV", content: cvv },
  ];

  const cardDetailsRightData = [
    { heading: "Transaction Limit", content: "$" + transactionLimit },
    { heading: "Reward Points", content: rewardPoints },
  ];

  if (cardType === "credit") {
    cardDetailsRightData.push({ heading: "Amount Due", content: amountDue });
  }

  const renderCardDetails = (list: DetailsItemProps[]) => {
    return list.map((item) => (
      <div key={item.heading as Key}>
        <h3 className="text-sm font-semibold text-[#232323]">{item.heading}</h3>
        <p className="text-sm text-[#718EBF]">{`${item.content}`}</p>
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-3">
          Card Details
        </h2>
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-4 bg-white mt-3 rounded-xl mr-3 p-6">
          <div>{renderCardDetails(cardDetailsLeftData)}</div>
          <div>
            {renderCardDetails(cardDetailsRightData)}
            <button
              className="rounded-lg text-white bg-[#1814F3] text-sm font-medium px-7 py-2 mt-5"
              onClick={handleBlockCard}
            >
              {cardStatus === "active" ? "Block Card" : "Unblock Card"}
            </button>
            <br />
            <PaymentPopup
              pin={pin}
              transactionLimit={transactionLimit}
              cardNumber={cardNumber}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="card-body">
          <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-3">
            Manage Card
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <PinChangeForm
              handleSubmit={handleSubmit}
              pin={pin}
              cardNumber={cardNumber}
            />
            <TransactionLimitForm
              handleSubmit={handleSubmit}
              transactionLimit={transactionLimit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
