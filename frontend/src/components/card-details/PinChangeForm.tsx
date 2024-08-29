import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { ChangeEvent, useRef } from "react";
import * as Yup from "yup";
import {
  handleBackspace,
  handleInputChange,
  validateConfirmPin,
  validateNewPin,
  validateOldPin,
} from "../../utils/form-validators";

const initialValues = {
  oldPin: ["", "", "", ""],
  newPin: ["", "", "", ""],
  confirmPin: ["", "", "", ""],
};

const PinChangeForm = (props: any) => {
  const { handleSubmit, pin } = props;

  const pinValidationSchema = Yup.object().shape({
    oldPin: Yup.array()
      .of(Yup.string().length(1).matches(/^\d$/))
      .test("is-valid", (value) =>
        validateOldPin(value, pin, "oldPin", "Old Pin")
      ),
    newPin: Yup.array()
      .of(Yup.string().length(1).matches(/^\d$/))
      .test("is-full", validateNewPin),
    confirmPin: Yup.array()
      .of(Yup.string().length(1).matches(/^\d$/))
      .test("is-match", validateConfirmPin),
  });

  const oldPinRefs = useRef<HTMLInputElement[]>([]);
  const newPinRefs = useRef<HTMLInputElement[]>([]);
  const confirmPinRefs = useRef<HTMLInputElement[]>([]);

  const fieldsList = [
    { name: "oldPin", legend: "OLD PIN", refObject: oldPinRefs },
    { name: "newPin", legend: "NEW PIN", refObject: newPinRefs },
    {
      name: "confirmPin",
      legend: "CONFIRM PIN",
      refObject: confirmPinRefs,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={pinValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {({ status, isSubmitting }) => (
        <Form className="bg-white mt-3 rounded-xl mr-3 p-6">
          <h3 className="text-xs sm:text-sm lg:text-base text-[#343C6A] font-semibold ml-1 mb-3">
            Change PIN
          </h3>
          {fieldsList.map((field) => (
            <fieldset key={field.name} className="mt-5">
              <legend className="text-xs text-[#718EBF]">{field.legend}</legend>
              <FieldArray
                name={field.name}
                render={(arrayHelpers) => (
                  <div>
                    {Array.from({ length: 4 }, (_, index) => (
                      <Field
                        key={index}
                        name={`${field.name}[${index}]`}
                        type="text"
                        maxLength={1}
                        onKeyDown={(e: any) => {
                          if (e.key === "Backspace") {
                            handleBackspace(
                              index,
                              arrayHelpers,
                              field.refObject
                            );
                          }
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            index,
                            e.target.value,
                            arrayHelpers,
                            field.refObject
                          )
                        }
                        innerRef={(ref: HTMLInputElement) =>
                          (field.refObject.current[index] = ref)
                        }
                        className={`border-b border-gray-500 w-8 mx-1 text-center focus:outline-none`}
                      />
                    ))}
                  </div>
                )}
              />
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-rose-700 bg-rose-100 border border-rose-400 text-xs rounded mt-2 px-2 py-1"
              />
            </fieldset>
          ))}
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
            Change PIN
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PinChangeForm;
