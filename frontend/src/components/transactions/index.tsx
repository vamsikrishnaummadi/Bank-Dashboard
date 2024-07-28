import MyCards from "../common/MyCards";
import AllTransactions from "./AllTransactions";
import MyExpense from "./MyExpense";

const Transactions = () => {
  return (
    <div className="overflow-y-auto">
      <div className="flex flex-wrap justify-between">
        <MyCards limit={2} />
        <MyExpense />
      </div>
      <AllTransactions />
    </div>
  );
};

export default Transactions;
