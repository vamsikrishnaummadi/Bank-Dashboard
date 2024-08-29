import { compareSync } from "bcryptjs";
import { FieldArrayRenderProps } from "formik";
import { MutableRefObject } from "react";
import { AnyObject, TestContext, ValidationError } from "yup";

export const handleFocus = (
  index: number,
  refObject: MutableRefObject<HTMLInputElement[]>
) => {
  refObject.current[index].focus();
};

export const handleInputChange = (
  index: number,
  value: string,
  arrayHelpers: FieldArrayRenderProps,
  refObject: MutableRefObject<HTMLInputElement[]>
) => {
  if (value !== "") {
    arrayHelpers.replace(index, value);
    if (index < 3) {
      handleFocus(index + 1, refObject);
    }
  }
};

export const handleBackspace = (
  index: number,
  arrayHelpers: FieldArrayRenderProps,
  refObject: MutableRefObject<HTMLInputElement[]>
) => {
  arrayHelpers.replace(index, "");
  if (index > 0) {
    handleFocus(index - 1, refObject);
  }
};

export const validateOldPin = (
  value: (string | undefined)[] | undefined,
  pin: string,
  name: string,
  text: string
) => {
  if (value) {
    const pinLength = value.filter((digit) => digit).length;
    const message =
      pinLength === 0
        ? `${text} is required`
        : pinLength < 4
        ? `${text} must be 4 digits`
        : !compareSync(value.join(""), pin)
        ? `${text} is incorrect`
        : "";
    console.log({ message });

    if (message) {
      throw new ValidationError(message, null, name);
    }
  }
  return true;
};

export const validateNewPin = (value: (string | undefined)[] | undefined) => {
  if (value) {
    const pinLength = value.filter((digit) => digit).length;
    const message =
      pinLength === 0
        ? "New Pin is required"
        : pinLength < 4
        ? "New Pin must be 4 digits"
        : "";
    if (message) {
      throw new ValidationError(message, null, "newPin");
    }
    return true;
  }
};

export const validateConfirmPin = (
  value: (string | undefined)[] | undefined,
  context: TestContext<AnyObject>
) => {
  if (value) {
    const pinLength = value.filter((digit) => digit).length;
    const message =
      pinLength === 0
        ? "Confirm Pin is required"
        : pinLength < 4
        ? "Confirm Pin must be 4 digits"
        : JSON.stringify(value) !== JSON.stringify(context.parent.newPin)
        ? "Confirm pin should be the same as new pin"
        : "";
    if (message) {
      throw new ValidationError(message, null, "confirmPin");
    }
    return true;
  }
};

export const validateAmount = (
  value: number | undefined,
  transactionLimit: number
) => {
  const message = value
    ? value < 0.01
      ? "Amount must be greater than 0"
      : value > transactionLimit
      ? `Limit exceeded. Please enter a value of not more than ${transactionLimit}`
      : ""
    : "Amount is required";
  if (message) {
    throw new ValidationError(message, null, "amount");
  }
  return true;
};
