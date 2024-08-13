import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";


const data = [
    { year: '2016', revenue: 12000 },
    { year: '2017', revenue: 28000 },
    { year: '2018', revenue: 19000 },
    { year: '2019', revenue: 38000 },
    { year: '2020', revenue: 25000 },
    { year: '2021', revenue: 32000 },
  ];

const MonthlyRevenue:React.FC = () => {
    return (
        <div className="rounded-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-[#333B69]">Monthly Revenue</h2>
            <ResponsiveContainer className="rounded-md bg-white" width="100%" height={250}>
                <LineChart width={450} height={250} data={data} className='p-4'>
                        <Line type="monotone" dot={false} dataKey="revenue" stroke="#34d399" strokeWidth={3} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false}/>
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
                        />
                        <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MonthlyRevenue;