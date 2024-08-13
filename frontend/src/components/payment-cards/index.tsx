import MyCards from "../common/MyCards";
import AddNewCard from "./AddNewCard";
import CardExpenseStatistics from "./CardExpenseStatistics";
import CardList from "./CardList";
import CardSetting from "./CardSetting";

const PaymentCards = () => {
  return (
    <div>
      <MyCards limit={3} />
      <div className="flex flex-col lg:flex-row mt-3">
        <CardExpenseStatistics />
        <CardList />
      </div>
      <div className="flex flex-col lg:flex-row mt-3">
        <AddNewCard />
        <CardSetting />
      </div>
    </div>
  );
};

export default PaymentCards;
