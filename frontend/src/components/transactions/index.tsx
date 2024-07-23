import MyCards from "../common/MyCards";

const Transactions = () => {
  return (
    <div className="overflow-y-auto">
      <div className="flex flex-wrap justify-between">
        <MyCards limit={2} />
      </div>
      <div className="flex flex-wrap justify-between mt-3"></div>
      <div className="mt-2"></div>
    </div>
  );
};

export default Transactions;
