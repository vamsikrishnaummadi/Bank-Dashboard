import MyCards from "../common/MyCards";
import BalanceHistory from "./BalanceHistory";
import ExpenseStatistics from "./ExpenseStatistics";
import RecentTransactions from "./RecentTransactions";
import WeeklyActivity from "./WeeklyActivity";

const Overview = () => {
  return (
    <div className="overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between">
        <MyCards limit={2} />
        <RecentTransactions />
      </div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between mt-4">
        <WeeklyActivity />
        <ExpenseStatistics />
      </div>
      <div className="mt-4">
        <BalanceHistory />
      </div>
    </div>
  );
};

export default Overview;
