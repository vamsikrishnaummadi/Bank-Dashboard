import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const limitValidationSchema = Yup.object().shape({
  transactionLimit: Yup.number()
    .positive()
    .integer("Must be a positive integer")
    .required("Required"),
});

const TransactionLimitForm = (props: any) => {
  const { handleSubmit, transactionLimit } = props;

  return (
    <Formik
      initialValues={{ transactionLimit }}
      validationSchema={limitValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status, values }) => (
        <Form className="bg-white mt-3 rounded-xl mr-3 p-6">
          <h3 className="text-xs sm:text-sm lg:text-base text-[#343C6A] font-semibold ml-1 mb-3">
            Change Transaction Limit
          </h3>
          <label
            htmlFor="transactionLimit"
            className="flex justify-between text-sm text-[#718EBF]"
          >
            <span>0</span>
            <span>5000</span>
          </label>
          <Field
            name="transactionLimit"
            type="range"
            min={0}
            max={5000}
            role="slider"
            placeholder="New Transaction Limit"
            className="w-full py-2 border border-[#DFEAF2] rounded-xl text-[#718EBF] placeholder:text-[#718EBF] text-sm"
          />
          <div className="text-center mt-1 text-sm text-[#718EBF]">
            Limit: {values.transactionLimit}
          </div>
          <ErrorMessage
            name="transactionLimit"
            component="div"
            className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded"
          />
          {status && (
            <p className="bg-green-100 border border-green-400 text-green-700 px-2 py-1 mt-3 rounded text-xs">
              {status}
            </p>
          )}
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
  );
};

export default TransactionLimitForm;
