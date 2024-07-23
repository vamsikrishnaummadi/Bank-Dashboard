import { Cell, Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#343C6A", "#FC7900", "#1814F3", "#FA00FF"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs"
    >
      <tspan dy={0} dx={0}>{`${(percent * 100).toFixed(0)}%`}</tspan>
      <tspan dy={15} dx={-25} className="text-[8px]">
        {data[index].name}
      </tspan>
    </text>
  );
};

const ExpenseStatistics = () => {
  return (
    <div className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
      <h2>Expenses Statistics</h2>
      <PieChart
        width={300}
        height={250}
        className="bg-white mt-1 border rounded-2xl lg:rounded-3xl"
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ExpenseStatistics;
