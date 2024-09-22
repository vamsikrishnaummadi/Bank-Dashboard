import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { RootState } from "../../store/store";
import { customFetch } from "../../utils/apiService";
import { validateAmount } from "../../utils/form-validators";
import { SetValuesProps } from "../payment-cards/AddNewCard";
import CustomSelect from "./CustomSelect";

const initialValues = { userName: "", amount: "" };

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("User Name is required"),
  amount: Yup.number().test("is-valid", (value) => validateAmount(value, 100)),
});

const QuickTransfer = () => {
  const [users, setUsers] = useState<any[]>([]);
  const userData = useSelector((state: RootState) => state?.user?.userData);

  useEffect(() => {
    customFetch(`${apiBaseUrl}/users`).then((res) => {
      if (res.success) {
        setUsers(res.data);
      }
    });
  }, []);

  if (!users.length) return null;

  const options = users.map((user) => {
    const { userName, profileImage } = user;
    return { value: userName, label: userName, imgSrc: profileImage };
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, setStatus, resetForm }: SetValuesProps
  ) => {
    const { amount, userName } = values;
    const res = await customFetch(`${apiBaseUrl}/transactions/create`, "POST", {
      amount,
      userName,
      description: "Quick Transfer",
      accountNumber: userData.accountNumber,
      paymentType: "quick-transfer",
    });
    if (res.success) {
      setStatus("Payment done successfully!");
      setTimeout(() => {
        resetForm();
        setStatus("");
      }, 2000);
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full sm:w-9/12 lg:w-2/5  mb-5 lg:mb-4">
      <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
        Quick Transfer
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="bg-white mt-3 rounded-xl mr-3 p-2 px-9">
            <label
              htmlFor="userName-quick"
              className="block text-[#232323] text-sm font-normal mb-2 mt-2"
            >
              Select Account
            </label>
            <Field
              type="text"
              component={CustomSelect}
              name="userName"
              id="userName-quick"
              options={options}
            />
            <ErrorMessage
              name="userName"
              component="div"
              className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded mt-2 px-2 py-1"
            />
            <div>
              <div>
                <label
                  htmlFor="amount-quick"
                  className="block text-[#232323] text-sm font-normal mb-2 mt-6"
                >
                  Write Amount
                </label>
                <Field
                  type="number"
                  name="amount"
                  id="amount-quick"
                  className="mt-1 block w-3/5 rounded-md border-gray-300 shadow-sm px-1 py-1 border text-[#718EBF] text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg text-white bg-[#1814F3] text-sm font-medium px-3 py-2 mt-6 mb-4"
                >
                  Send
                  <PaperAirplaneIcon
                    height={16}
                    width={16}
                    color="white"
                    className="inline-block my-1 ml-2"
                  />
                </button>
              </div>
            </div>
            <ErrorMessage
              name="amount"
              component="div"
              className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded mt-2 px-2 py-1"
            />
            {status && (
              <p className="bg-green-100 border border-green-400 text-green-700 px-2 py-1 mt-3 rounded text-xs">
                {status}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuickTransfer;
