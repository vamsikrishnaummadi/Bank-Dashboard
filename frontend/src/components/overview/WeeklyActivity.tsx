import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomBar from "../common/CustomBar";

const WeeklyActivity = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];

  return (
    <div>
      <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
        Weekly Activity
      </h2>
      <BarChart
        width={600}
        height={250}
        data={data}
        className="bg-white mt-3 p-4 rounded-xl"
      >
        <CartesianGrid vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend verticalAlign="top" align="right" iconType="circle" />
        <Bar dataKey="pv" fill="#1814F3" barSize={12} shape={<CustomBar />} />
        <Bar dataKey="uv" fill="#16DBCC" barSize={12} shape={<CustomBar />} />
      </BarChart>
    </div>
  );
};

export default WeeklyActivity;
