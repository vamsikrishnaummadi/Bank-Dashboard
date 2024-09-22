import { XCircleIcon } from "@heroicons/react/16/solid";
import { ErrorMessage, Field, Form, Formik, FormikState } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { RootState } from "../../store/store";
import { customFetch } from "../../utils/apiService";

export interface FormValuesProps {
  cardType: string;
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
}

export interface SetValuesProps {
  setSubmitting: (isSubmitting: boolean) => void;
  setStatus: (status?: any) => void;
  resetForm: (
    nextState?: Partial<FormikState<FormValuesProps>> | undefined
  ) => void;
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const initialValues = {
  cardType: "",
  cardHolderName: "",
  cardNumber: "",
  expirationDate: "",
};

const validationSchema = Yup.object().shape({
  cardType: Yup.string()
    .required("Card Type is required")
    .oneOf(["debit", "credit"]),
  cardHolderName: Yup.string().required("Name on Card is required"),
  cardNumber: Yup.string().required("Card Number is required"),
  expirationDate: Yup.string().required("Expiration Date is required"),
});

const AddNewCard = () => {
  const userData = useSelector((state: RootState) => state?.user?.userData);

  const submitHandler = async (
    values: FormValuesProps,
    { setSubmitting, setStatus, resetForm }: SetValuesProps
  ) => {
    const { accountNumber } = userData;
    const res = await customFetch(`${apiBaseUrl}/cards/create`, "POST", {
      ...values,
      accountNumber,
    });
    if (res.success) {
      console.log(res.message);
      setStatus(res.message);
      setTimeout(() => {
        resetForm();
      }, 2000);
    } else {
      console.log(res.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full sm:w-11/12 lg:w-2/3  mb-5 lg:mb-4">
      <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
        Add New Card
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ isSubmitting, status, setStatus }) => (
          <Form className="bg-white mt-3 rounded-xl mr-3 p-6">
            <div className="grid grid-cols-2 gap-5 mt-3">
              <div className="grow">
                <label
                  htmlFor="cardType"
                  className="block text-[#232323] text-sm font-normal mb-2"
                >
                  Card Type
                </label>
                <Field
                  as="select"
                  id="cardType"
                  name="cardType"
                  className="w-full px-3 py-2 border border-[#DFEAF2] rounded-xl text-[#718EBF] placeholder:text-[#718EBF] text-sm"
                >
                  <option value="">Select Card Type</option>
                  <option value="debit">Debit</option>
                  <option value="credit">Credit</option>
                </Field>
                <ErrorMessage
                  name="cardType"
                  component="div"
                  className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded mt-2 px-2 py-1"
                />
              </div>
              <div className="grow">
                <label
                  htmlFor="cardHolderName"
                  className="block text-[#232323] text-sm font-normal mb-2"
                >
                  Name on Card
                </label>
                <Field
                  type="text"
                  id="cardHolderName"
                  name="cardHolderName"
                  className="w-full px-3 py-2 border border-[#DFEAF2] rounded-xl text-[#718EBF] placeholder:text-[#718EBF] text-sm"
                />
                <ErrorMessage
                  name="cardHolderName"
                  component="div"
                  className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded mt-2 px-2 py-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-3">
              <div className="grow">
                <label
                  htmlFor="cardNumber"
                  className="block text-[#232323] text-sm font-normal mb-2"
                >
                  Card Number
                </label>
                <Field
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  className="w-full px-3 py-2 border border-[#DFEAF2] rounded-xl text-[#718EBF] placeholder:text-[#718EBF] text-sm"
                />
                <ErrorMessage
                  name="cardNumber"
                  component="div"
                  className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded mt-2 px-2 py-1"
                />
              </div>
              <div className="grow">
                <label
                  htmlFor="expirationDate"
                  className="block text-[#232323] text-sm font-normal mb-2"
                >
                  Expiration Date
                </label>
                <Field
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  className="w-full px-3 py-2 border border-[#DFEAF2] rounded-xl text-[#718EBF] placeholder:text-[#718EBF] text-sm"
                />
                <ErrorMessage
                  name="expirationDate"
                  component="div"
                  className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded mt-2 px-2 py-1"
                />
              </div>
            </div>
            {status && (
              <p className="bg-green-100 border border-green-400 text-green-700 px-2 py-1 mt-3 rounded text-xs">
                {status}
                <XCircleIcon
                  className="w-4 h-4 text-green-700 inline ml-1 mb-1 cursor-pointer"
                  onClick={() => setStatus("")}
                />
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg text-white bg-[#1814F3] text-sm font-medium px-7 py-2 mt-3"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewCard;
