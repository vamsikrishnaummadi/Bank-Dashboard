import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";

const TransactionListItem = (props: any) => {
  const { description, createdAt, amount, type } = props.transaction;
  return (
    <li className="flex justify-between p-2 border-b border-gray-200">
      <div className="flex items-center">
        {type === "debit" ? (
          <ArrowDownCircleIcon
            width={35}
            height={35}
            color="#718EBF"
            className="inline mr-1"
          />
        ) : (
          <ArrowUpCircleIcon
            width={35}
            height={35}
            color="#718EBF"
            className="inline mr-1"
          />
        )}
        <div>
          <span className="text-sm font-medium text-[#232323]">
            {description}
          </span>
          <br />
          <span className="text-xs font-normal text-gray-500 text-[#718EBF]">
            {createdAt}
          </span>
        </div>
      </div>
      <div
        className={`text-right text-sm font-medium ${
          type === "credit" ? "text-[#16DBAA]" : "text-[#FE5C73]"
        }`}
      >
        {type === "credit" ? "+" : "-"}${amount}
      </div>
    </li>
  );
};

export default TransactionListItem;
