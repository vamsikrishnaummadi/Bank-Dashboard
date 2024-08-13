import { ErrorMessage, Field, Form, Formik } from "formik";
import { Key, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { getCardDetails, updateCardDetails } from "../utils/apiService";
import { SetValuesProps } from "./payment-cards/AddNewCard";

interface DetailsItemProps {
  heading: String;
  content: String | Number;
}

const pinValidationSchema = Yup.object().shape({
  oldPin: Yup.string().required("Required"),
  pin: Yup.string().required("Required"),
  reenterPin: Yup.string().required("Required"),
});

const limitValidationSchema = Yup.object().shape({
  newTransactionLimit: Yup.number()
    .positive()
    .integer("Must be a positive integer")
    .required("Required"),
});

const CardDetails = () => {
  const [cardData, setCardData] = useState(null);
  console.log({ cardData });

  const location = useLocation();
  const { pathname } = location;
  const cardNumber = pathname.slice(pathname.lastIndexOf("/") + 1);

  useEffect(() => {
    getCardDetails(cardNumber).then((res) => {
      console.log({ res });

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
    const res = await updateCardDetails(
      {
        cardStatus: cardStatus === "active" ? "blocked" : "active",
      },
      cardNumber
    );
    if (res.success) {
      setCardData(res.data);
    }
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting, setStatus, resetForm }: SetValuesProps
  ) => {
    const res = await updateCardDetails({ ...values }, cardNumber);
    if (res.success) {
      setStatus("Submitted successfully!");
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
    { heading: "Transaction Limit", content: transactionLimit },
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
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="card-body">
          <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-3">
            Manage Card
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Change PIN form */}
            <Formik
              initialValues={{ oldPin: "", pin: "", reenterPin: "" }}
              validationSchema={pinValidationSchema}
              onSubmit={handleSubmit}
              // validate={(values) => {
              //   return "pins dont match";
              // }}
            >
              {({ isSubmitting }) => {
                const fieldsList = [
                  { name: "oldPin", placeholder: "OLD PIN" },
                  { name: "pin", placeholder: "NEW PIN" },
                  { name: "reenterPin", placeholder: "RE ENTER PIN" },
                ];
                return (
                  <Form className="bg-white mt-3 rounded-xl mr-3 p-6">
                    <h3 className="text-xs sm:text-sm lg:text-base text-[#343C6A] font-semibold ml-1 mb-3">
                      Change PIN
                    </h3>
                    <fieldset>
                      {fieldsList.map((field) => (
                        <div key={field.name}>
                          <Field
                            name={field.name}
                            type="password"
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2 border border-[#DFEAF2] rounded-xl text-[#718EBF] placeholder:text-[#718EBF] text-sm mb-3"
                          />
                          <ErrorMessage
                            name="pin"
                            component="div"
                            className="text-rose-600 font-normal text-sm"
                          />
                        </div>
                      ))}
                    </fieldset>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-lg text-white bg-[#1814F3] text-sm font-medium px-7 py-2 mt-3"
                    >
                      Change PIN
                    </button>
                  </Form>
                );
              }}
            </Formik>
            {/* Change Transaction Limit form */}
            <Formik
              initialValues={{ newTransactionLimit: "" }}
              validationSchema={limitValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="bg-white mt-3 rounded-xl mr-3 p-6">
                  <h3 className="text-xs sm:text-sm lg:text-base text-[#343C6A] font-semibold ml-1 mb-3">
                    Change Transaction Limit
                  </h3>
                  <Field
                    name="newTransactionLimit"
                    type="number"
                    placeholder="New Transaction Limit"
                    className="w-full px-3 py-2 border border-[#DFEAF2] rounded-xl text-[#718EBF] placeholder:text-[#718EBF] text-sm"
                  />
                  <ErrorMessage
                    name="newTransactionLimit"
                    component="div"
                    className="text-rose-600 font-normal text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg text-white bg-[#1814F3] text-sm font-medium px-7 py-2 mt-3"
                  >
                    Change Limit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
