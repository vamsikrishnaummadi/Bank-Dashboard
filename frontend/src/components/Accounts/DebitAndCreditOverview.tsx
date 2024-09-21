import React, { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Sat", debit: 400, credit: 240 },
  { day: "Sun", debit: 300, credit: 139 },
  { day: "Mon", debit: 200, credit: 980 },
  { day: "Tue", debit: 278, credit: 390 },
  { day: "Wed", debit: 189, credit: 480 },
  { day: "Thu", debit: 239, credit: 380 },
  { day: "Fri", debit: 349, credit: 430 },
];

const DebitAndCreditOverview: React.FC = () => {
  const [chartDimensions, setChartDimensions] = useState({
    width: 500,
    height: 200,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (containerRef.current) {
      const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;

      // Set dimensions based on screen size
      setChartDimensions({
        width: isLargeScreen ? 500 : 800,
        height: 200,
      });
    }
  };

  useEffect(() => {
    handleResize(); // Set initial dimensions
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="rounded-lg w-full lg:w-4/6">
      <h2 className="text-lg font-semibold mb-2">Debit & Credit Overview</h2>
      <div className="flex flex-col items-start bg-white rounded-lg p-2">
        <div className="flex justify-between w-full">
          <div className="">
            <p className="text-[#718EBF]">
              <span className="text-[#333B69] font-semibold">$7,560</span>{" "}
              Debited &{" "}
              <span className="text-[#333B69] font-semibold">$5,420</span>{" "}
              Credited in this Week
            </p>
          </div>
          <ul className="flex items-center gap-2">
            <li>
              <span className="rounded-full bg-yellow-500 text-transparent mr-2">
                """
              </span>
              <span>Debit</span>
            </li>
            <li>
              <span className="w-8 h-8 rounded-full bg-[#1A16F3] text-transparent mr-2">
                """
              </span>
              <span>credit</span>
            </li>
          </ul>
        </div>
        <div className="w-full" ref={containerRef}>
          <ResponsiveContainer width={chartDimensions.width} height={200}>
            <BarChart
              width={500}
              height={250}
              data={data}
              className="rounded-xl w-full"
              barCategoryGap={100}
              margin={{ left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                vertical={false}
              />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tick={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="debit" fill="#FCAA0B" radius={4} barSize={15} />
              <Bar dataKey="credit" fill="#1A16F3" radius={4} barSize={15} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DebitAndCreditOverview;
