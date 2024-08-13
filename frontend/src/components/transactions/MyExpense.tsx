import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  LabelProps,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import CustomBar from "../common/CustomBar";

const data = [
  { month: "Jan", amount: 1500 },
  { month: "Feb", amount: 1600 },
  { month: "Mar", amount: 1700 },
  { month: "Apr", amount: 1800 },
  { month: "May", amount: 1900 },
  { month: "June", amount: 2000 },
];

const MyExpense = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseOver = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0);
  };

  const renderCustomizedLabel = (props: LabelProps) => {
    const { x, y, index, value } = props;

    return (
      <text
        x={x}
        y={typeof y === "number" ? y - 5 : y}
        fill="#343C6A"
        className="text-xs"
      >
        {index === activeIndex ? `$${value}` : ""}
      </text>
    );
  };

  return (
    <div className="w-full lg:w-1/3">
      <div className="lg:ml-3 mb-3">
        <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
          My Expense
        </h2>
        <div className="w-4/5 sm:w-1/2 lg:w-full mt-6">
          <ResponsiveContainer width="100%" height={210}>
            <BarChart
              width={450}
              height={210}
              data={data}
              className="bg-white p-3 rounded-xl"
              onMouseLeave={handleMouseOut}
            >
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                dataKey="amount"
                domain={([_, dataMax]) => [0, Math.round(dataMax * 1.15)]}
                hide
              />
              <Bar
                dataKey="amount"
                fill="#EDF0F7"
                barSize={32}
                shape={<CustomBar />}
                radius={8}
                onMouseOver={handleMouseOver}
                label={renderCustomizedLabel}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === activeIndex ? "#16DBCC" : "#EDF0F7"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MyExpense;
