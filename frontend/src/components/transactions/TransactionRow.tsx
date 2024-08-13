import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";

const commonClasses =
  "text-sm xl:text-base whitespace-nowrap px-2 py-4 border-t border-solid border-[#E6EFF5]";

const TransactionRow = (props: any) => {
  const { description, transactionId, type, cardNumber, createdAt, amount } =
    props.transaction;
  return (
    <>
      <tr className="">
        <td className={`font-normal ${commonClasses}`}>
          {type === "debit" ? (
            <ArrowDownCircleIcon
              width={20}
              height={20}
              color="#718EBF"
              className="inline mr-1"
            />
          ) : (
            <ArrowUpCircleIcon
              width={20}
              height={20}
              color="#718EBF"
              className="inline mr-1"
            />
          )}
          {description}
        </td>
        <td className={`font-normal ${commonClasses}`}>{transactionId}</td>
        <td className={`font-normal ${commonClasses}`}>{type}</td>
        <td className={`font-normal ${commonClasses}`}>{cardNumber}</td>
        <td className={`font-normal ${commonClasses}`}>{createdAt}</td>
        <td
          className={`font-medium ${commonClasses} ${
            type === "credit" ? "text-[#16DBAA]" : "text-[#FE5C73]"
          }`}
        >
          {type === "credit" ? "+" : "-"}${amount}
        </td>
        <td className={`font-medium ${commonClasses}`}>
          <button className="text-blue-500 border border-blue-500 p-2 rounded-3xl">
            view details
          </button>
        </td>
      </tr>
    </>
  );
};

export default TransactionRow;
