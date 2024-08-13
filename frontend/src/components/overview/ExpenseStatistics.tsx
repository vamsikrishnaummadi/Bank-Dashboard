import {
  Cell,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Entertainment", value: 300 },
  { name: "Bill Expense", value: 200 },
  { name: "Investment", value: 200 },
  { name: "Others", value: 300 },
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
}: PieLabelRenderProps) => {
  if (
    !(
      typeof innerRadius === "number" &&
      typeof outerRadius === "number" &&
      typeof midAngle === "number" &&
      typeof cx === "number" &&
      typeof cy === "number" &&
      typeof percent === "number" &&
      typeof index === "number"
    )
  ) {
    return null;
  }
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
      className="text-sm"
    >
      <tspan dy={0} dx={x > cx ? -20 : 20}>{`${(percent * 100).toFixed(
        0
      )}%`}</tspan>
      <tspan dy={15} dx={-35} className="text-xs">
        {data[index].name}
      </tspan>
    </text>
  );
};

const ExpenseStatistics = () => {
  return (
    <div className="w-full lg:w-1/3">
      <div className="lg:ml-3 mb-3">
        <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
          Expenses Statistics
        </h2>
        <div className="w-4/5 sm:w-1/2 lg:w-full sm:m-auto">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart
              width={450}
              height={250}
              className="bg-white mt-1 border rounded-2xl lg:rounded-3xl"
            >
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                paddingAngle={5}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatistics;
