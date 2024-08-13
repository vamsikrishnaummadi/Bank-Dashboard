import React from "react";
import { ResponsiveContainer,LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const data = [
    { year: '2016', investment: 10000 },
    { year: '2017', investment: 25000 },
    { year: '2018', investment: 15000 },
    { year: '2019', investment: 35000 },
    { year: '2020', investment: 20000 },
    { year: '2021', investment: 22000 },
];

const YearlyTotalInvestment: React.FC = () => {
    return (
        <div className="rounded-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-[#333B69]">Yearly Total Investment</h2>
            <ResponsiveContainer className="rounded-md bg-white" width="100%" height={250}>
                <LineChart width={400} height={250} data={data} className="p-4">
                        <Line type="linear" dataKey="investment" stroke="#f59e0b" strokeWidth={3} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"  vertical={false}/>
                        <XAxis 
                            dataKey="year" 
                            axisLine={false} 
                            tickLine={false} 
                            padding={{ left: 30, right: 30 }}
                            allowDataOverflow
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            domain={[0, 40000]} 
                            tickCount={5}
                            ticks={[0, 10000, 20000, 30000, 40000]} 
                            allowDataOverflow={false}
                        />
                        <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
};

export default YearlyTotalInvestment;