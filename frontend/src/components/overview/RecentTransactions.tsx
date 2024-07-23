import { useEffect, useState } from "react";

const RecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    fetch("api/transactions?page=1&limit=3").then((res) =>
      res.json().then((parsedRes) => {
        if (parsedRes.success) {
          console.log("rt: " + parsedRes.data);
          setRecentTransactions(parsedRes.data);
        }
      })
    );
  }, []);

  return <div></div>;
};

export default RecentTransactions;
