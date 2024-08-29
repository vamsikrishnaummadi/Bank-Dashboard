import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { RootState } from "../../store/store";
import { customFetch } from "../../utils/apiService";
import {
  handleBackspace,
  handleInputChange,
  validateAmount,
  validateOldPin,
} from "../../utils/form-validators";
import { SetValuesProps } from "../payment-cards/AddNewCard";

interface PaymentPopupProps {
  pin: string;
  transactionLimit: number;
  cardNumber: string;
}

const initialValues = {
  userName: "",
  amount: "",
  cardPin: ["", "", "", ""],
};

const PaymentPopup = ({
  pin,
  transactionLimit,
  cardNumber,
}: PaymentPopupProps) => {
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const { accountNumber } = userData;

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const cardPinRefs = useRef<HTMLInputElement[]>([]);

  const validationSchema = Yup.object({
    userName: Yup.string().required("Username is required"),
    amount: Yup.number().test("is-valid", (value) =>
      validateAmount(value, transactionLimit)
    ),
    cardPin: Yup.array()
      .of(Yup.string().length(1).matches(/^\d$/))
      .test("is-valid", (value) =>
        validateOldPin(value, pin, "cardPin", "Card Pin")
      ),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, setStatus, resetForm }: SetValuesProps
  ) => {
    const { amount, userName, description } = values;
    const res = await customFetch("/api/transactions/create", "POST", {
      amount,
      userName,
      description,
      accountNumber,
      cardNumber,
      paymentType: "card-to-account",
    });
    if (res.success) {
      setStatus("Payment done successfully!");
      setTimeout(() => {
        resetForm();
        setStatus("");
        closeModal();
      }, 2000);
    }
    setSubmitting(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="rounded-lg text-white bg-[#1814F3] text-sm font-medium px-7 py-2 mt-5"
      >
        Make a Payment
      </button>
      <Transition show={isOpen} as={Fragment}>
        {/* empty onClose is given to Dialog to avoid type error*/}
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Make a Payment
                  </DialogTitle>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                  >
                    {({ isSubmitting, status }) => (
                      <Form className="mt-4 space-y-4">
                        <div>
                          <label
                            htmlFor="userName"
                            className="text-xs text-[#718EBF]"
                          >
                            USERNAME
                          </label>
                          <Field
                            type="text"
                            name="userName"
                            id="userName"
                            className="mt-1 block w-4/5 rounded-md border-gray-300 shadow-sm px-3 py-2 border text-[#718EBF] text-sm"
                          />
                          <ErrorMessage
                            name="userName"
                            component="div"
                            className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded mt-2 px-2 py-1"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="amount"
                            className="text-xs text-[#718EBF]"
                          >
                            AMOUNT ($)
                          </label>
                          <Field
                            type="number"
                            name="amount"
                            id="amount"
                            className="mt-1 block w-4/5 shadow-sm px-3 py-2 border border-[#DFEAF2] rounded-xl text-[#718EBF] text-sm"
                          />
                          <ErrorMessage
                            name="amount"
                            component="div"
                            className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded mt-2 px-2 py-1"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="description"
                            className="text-xs text-[#718EBF]"
                          >
                            DESCRIPTION
                          </label>
                          <Field
                            type="text"
                            as="textarea"
                            name="description"
                            id="description"
                            className="mt-1 block w-4/5 shadow-sm px-3 py-2 border border-[#DFEAF2] rounded-xl text-[#718EBF] text-sm"
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded mt-2 px-2 py-1"
                          />
                        </div>
                        <div>
                          <fieldset className="mt-5">
                            <legend className="text-xs text-[#718EBF]">
                              Card PIN
                            </legend>
                            <FieldArray
                              name="cardPin"
                              render={(arrayHelpers) => (
                                <div>
                                  {Array.from({ length: 4 }, (_, index) => (
                                    <Field
                                      key={index}
                                      name={`cardPin[${index}]`}
                                      type="text"
                                      maxLength={1}
                                      onKeyDown={(e: any) => {
                                        if (e.key === "Backspace") {
                                          handleBackspace(
                                            index,
                                            arrayHelpers,
                                            cardPinRefs
                                          );
                                        }
                                      }}
                                      onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                      ) =>
                                        handleInputChange(
                                          index,
                                          e.target.value,
                                          arrayHelpers,
                                          cardPinRefs
                                        )
                                      }
                                      innerRef={(ref: HTMLInputElement) =>
                                        (cardPinRefs.current[index] = ref)
                                      }
                                      className={`border-b border-gray-500 w-8 mx-1 text-center focus:outline-none`}
                                    />
                                  ))}
                                </div>
                              )}
                            />
                            <ErrorMessage
                              name="cardPin"
                              component="div"
                              className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded mt-2 px-2 py-1"
                            />
                          </fieldset>
                        </div>
                        {status && (
                          <p className="bg-green-100 border border-green-400 text-green-700 px-2 py-1 mt-3 rounded text-xs">
                            {status}
                          </p>
                        )}
                        <div className="mt-6 text-right">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg text-white bg-[#1814F3] text-sm font-medium px-7 py-2 mt-3"
                          >
                            {isSubmitting ? "Processing..." : "Make Payment"}
                          </button>
                          <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-lg text-white bg-rose-700 text-sm font-medium px-7 py-2 mt-3 ml-3"
                          >
                            Cancel
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PaymentPopup;
