import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "DBL Bank", value: 300 },
  { name: "BRC Bank", value: 200 },
  { name: "ABM Bank", value: 200 },
  { name: "MCP Bank", value: 300 },
];

const COLORS = ["#16DBCC", "#4C78FF", "#FFBB38", "#FF82AC"];
const COLORS2 = ["#1EC6B8", "#3464F3", "#FFB11F", "#FF6195"];

const CardExpenseStatistics = () => {
  return (
    <div className="w-4/5 sm:w-1/2 lg:w-1/3">
      <div className="mb-3">
        <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
          Expenses Statistics
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart
            width={450}
            height={250}
            className="bg-white mt-1 border rounded-2xl lg:rounded-3xl"
          >
            <Legend verticalAlign="bottom" />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              innerRadius={30}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              legendType="circle"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={30}
              innerRadius={20}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              legendType="none"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS2[index % COLORS2.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CardExpenseStatistics;
