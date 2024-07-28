import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import CustomBar from "../common/CustomBar";

const data = [
  {
    day: "mon",
    deposit: 150,
    withdraw: 50,
  },
  {
    day: "tue",
    deposit: 200,
    withdraw: 100,
  },
  {
    day: "wed",
    deposit: 100,
    withdraw: 0,
  },
  {
    day: "thu",
    deposit: 0,
    withdraw: 80,
  },
  {
    day: "fri",
    deposit: 300,
    withdraw: 150,
  },
  {
    day: "sat",
    deposit: 0,
    withdraw: 0,
  },
  {
    day: "sun",
    deposit: 250,
    withdraw: 120,
  },
];

const WeeklyActivity = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  console.log({ size });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setSize(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full sm:w-11/12 lg:w-2/3 mb-5 lg:mb-4" ref={containerRef}>
      <div>
        <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
          Weekly Activity
        </h2>
        <BarChart
          width={size - 12}
          height={size > 500 ? size / 2 : size * (3 / 5)}
          data={data}
          className="bg-white rounded-xl mr-3"
        >
          <CartesianGrid vertical={false} stroke="#e2e8f0" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickSize={10}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            domain={([_, dataMax]) => [0, dataMax * 1.15]}
            tickSize={10}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" />
          <Bar
            dataKey="deposit"
            fill="#1814F3"
            barSize={size > 500 ? 12 : 7}
            shape={<CustomBar />}
            radius={9999}
          />
          <Bar
            dataKey="withdraw"
            fill="#16DBCC"
            barSize={size > 500 ? 12 : 7}
            shape={<CustomBar />}
            radius={9999}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default WeeklyActivity;
