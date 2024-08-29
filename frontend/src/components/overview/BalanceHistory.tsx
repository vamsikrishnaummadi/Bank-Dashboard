import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "2024-01-01", balance: 593.93 },
  { date: "2024-01-17", balance: 743.67 },
  { date: "2024-02-02", balance: 642.49 },
  { date: "2024-02-19", balance: 590.39 },
  { date: "2024-03-06", balance: 481.29 },
  { date: "2024-03-23", balance: 681.3 },
  { date: "2024-04-08", balance: 493.83 },
  { date: "2024-04-25", balance: 902.6 },
  { date: "2024-05-11", balance: 967.3 },
  { date: "2024-05-28", balance: 445.1 },
  { date: "2024-06-13", balance: 812.55 },
  { date: "2024-06-30", balance: 576.01 },
];

const BalanceHistory = () => {
  const CustomXAxisTick = ({ x, y, payload }: any) => {
    const date = new Date(payload.value);
    const month = date.toLocaleString("default", { month: "short" });
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {month}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full sm:w-11/12 lg:w-3/5  mb-5 lg:mb-4">
      <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
        Balance History
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          width={450}
          height={250}
          data={data}
          className="bg-white mt-3 rounded-xl mr-3 p-2"
        >
          <defs>
            <linearGradient x1="0" y1="0" x2="0" y2="1" id="colorGradient">
              <stop offset="5%" stopColor="#2D60FF40" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2D60FF00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" color="#DFE5EE" />
          <XAxis
            dataKey="date"
            tickCount={6}
            tick={<CustomXAxisTick />}
            axisLine={false}
            tickSize={3}
            tickMargin={10}
          />
          <YAxis
            dataKey="balance"
            type="number"
            axisLine={false}
            tickSize={3}
            tickMargin={10}
            domain={([_, dataMax]) => [0, Math.round(dataMax * 1.15)]}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceHistory;
