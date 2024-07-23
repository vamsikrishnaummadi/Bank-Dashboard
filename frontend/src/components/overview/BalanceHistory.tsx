import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data: any[] = [];
const startDate = new Date(2024, 0, 1); // Start date (January 1, 2024)

for (let i = 0; i < 180; i++) {
  const newDate = new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24)); // Increment by 1 day
  data.push({
    date: newDate,
    value: Math.random() * 100, // Random value between 0 and 100
  });
}

const formattedData = data.reduce((accumulator, currentValue) => {
  const { date, value } = currentValue;
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const currentDateNumber = date.getTime();
  const startDate = new Date(currentYear, currentMonth, 1).getTime();
  const endDate = new Date(currentYear, currentMonth + 1, 1).getTime();
  const formattedDateTime =
    Math.floor(((currentDateNumber - startDate) * 2) / (endDate - startDate)) *
      100 +
    currentMonth * 200;
  const currentKey = formattedDateTime.toString();

  if (accumulator[currentKey]) {
    const currentEntry = accumulator[currentKey];
    accumulator[currentKey] = {
      value: (currentEntry.value + value) / currentEntry.count,
      count: currentEntry.count,
    };
    return accumulator;
  } else {
    accumulator[currentKey] = { value, count: 1 };
    return accumulator;
  }
}, {});

const finalData = Object.entries(formattedData).map((item: any) => ({
  date: item[0],
  value: item[1].value,
}));

const BalanceHistory = () => {
  return (
    <div style={{ userSelect: "none", width: "100%" }}>
      <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1">
        Balance History
      </h2>
      <ResponsiveContainer
        width="60%"
        height={250}
        className="bg-white mt-1 border rounded-2xl lg:rounded-3xl p-2"
      >
        <LineChart
          width={500}
          height={200}
          data={finalData}

          // eslint-disable-next-line react/jsx-no-bind
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            type="number"
            tickCount={6}
            axisLine={false}
            tickSize={3}
            tickMargin={10}
          />
          <YAxis
            dataKey="value"
            type="number"
            axisLine={false}
            tickSize={3}
            tickMargin={10}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceHistory;
