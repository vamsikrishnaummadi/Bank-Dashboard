import {totalInvestmentIcon, numberOfInvestmentIcon, rateOfReturnIcon, apple, tesla, samsung} from "../utils/assetsGroup";
import {LineChart, Line, XAxis, YAxis, CartesianGrid,Tooltip, ResponsiveContainer} from 'recharts';

const data = [
      { year: '2016', investment: 10000 },
      { year: '2017', investment: 25000 },
      { year: '2018', investment: 15000 },
      { year: '2019', investment: 35000 },
      { year: '2020', investment: 20000 },
      { year: '2021', investment: 22000 },
    ];
    
    const revenueData = [
      { year: '2016', revenue: 12000 },
      { year: '2017', revenue: 28000 },
      { year: '2018', revenue: 19000 },
      { year: '2019', revenue: 38000 },
      { year: '2020', revenue: 25000 },
      { year: '2021', revenue: 32000 },
    ];

const Investments = () => {
  return (
       <div className="rounded-lg flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-x-3">
                        <img src={totalInvestmentIcon} alt="total investment icon" />
                        <div className="flex flex-col justify-start w-full">
                           <span className="text-[#718EBF] text-base font-normal">Total Invested Amount</span>
                           <p className="text-[#232323] font-bold text-md">$150,000</p>
                        </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-x-3">
                        <img src={numberOfInvestmentIcon} alt="total investment icon" />
                        <div className="flex flex-col justify-start w-full">
                           <span className="text-[#718EBF] text-base font-normal">Number of Investments</span>
                           <p className="text-[#232323] font-bold text-md">1,250</p>
                        </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-x-3">
                        <img src={rateOfReturnIcon} alt="total investment icon" />
                        <div className="flex flex-col justify-start w-full">
                           <span className="text-[#718EBF] text-base font-normal">Rate of Return</span>
                           <p className="text-[#232323] font-bold text-md">5.8%</p>
                        </div>
                  </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  {/* Charts */}
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
                  <div className="rounded-lg w-full">
                  <h2 className="text-xl font-bold mb-4 text-[#333B69]">Monthly Revenue</h2>
                  <ResponsiveContainer className="rounded-md bg-white" width="100%" height={250}>
                        <LineChart width={450} height={250} data={revenueData} className='p-4'>
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
            </div>
            <div className="w-full flex flex-wrap lg:flex-nowrap gap-2 mb-20">
                  {/* My Investment Section */}
                  <div className="rounded-lg col-span-2 w-full lg:w-3/5">
                        <h2 className="text-xl font-bold mb-4 text-[#333B69]">My Investment</h2>
                        <div className="space-y-4">
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                        <div className="flex items-center">
                              <img src={apple} alt="Apple" className="w-10 h-10" />
                              <div className="ml-4">
                              <h3 className="text-md font-semibold">Apple Store</h3>
                              <p className="text-[#718EBF] text-sm">E-commerce, Marketplace</p>
                              </div>
                        </div>
                        <div className="text-center">
                              <p className="text-md font-semibold">54000</p>
                              <p className="text-[#718EBF] text-sm">Envestment value</p>
                        </div>
                        <div className="text-right">
                              <p className="text-green-500">+16%</p>
                              <p className="text-[#718EBF] text-sm">Return Value</p>
                        </div>
                        </div>
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                        <div className="flex items-center">
                              <img src={samsung} alt="Samsung" className="w-10 h-10" />
                              <div className="ml-4">
                              <h3 className="text-md font-semibold">Samsung Mobile</h3>
                              <p className="text-[#718EBF] text-sm">E-commerce, Marketplace</p>
                              </div>
                        </div>
                        <div className="text-center">
                              <p className="text-md font-semibold">25300</p>
                              <p className="text-[#718EBF] text-sm">Envestment value</p>
                        </div>
                        <div className="text-right">
                              <p className="text-red-500">-4%</p>
                              <p className="text-[#718EBF] text-sm">Return Value</p>
                        </div>
                        </div>
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                        <div className="flex items-center">
                              <img src={tesla} alt="Tesla" className="w-10 h-10" />
                              <div className="ml-4">
                              <h3 className="text-md font-semibold">Tesla Motors</h3>
                              <p className="text-[#718EBF] text-sm">Electric Vehicles</p>
                              </div>
                        </div>
                        <div className="text-center">
                              <p className="text-md font-semibold">8200</p>
                              <p className="text-[#718EBF] text-sm">Envestment value</p>
                        </div>
                        <div className="text-right">
                              <p className="text-green-500">+25%</p>
                              <p className="text-[#718EBF] text-sm">Return Value</p>
                        </div>
                        </div>
                        </div>
                  </div>

                  {/* Trending Stock Section */}
                  <div className="col-span-1 w-full lg:w-2/5">
                        <h2 className="text-xl font-bold mb-4 text-[#333B69]">Trending Stock</h2>
                        <table className="w-full bg-white rounded-xl">
                        <tr className="bg-white text-center rounded-xl text-[#718EBF] p-2 border-b-[1px]">
                              <th className="px-4 py-4 w-2/12 text-sm font-bold whitespace-nowrap">SL No</th>
                              <th className="px-4 py-4 w-4/12 text-sm font-bold">Name</th>
                              <th className="px-4 py-4 w-4/12 text-sm font-bold">Price</th>
                              <th className="px-4 py-4 w-3/12 text-sm font-bold">Return</th>
                        </tr>
                        <tbody>
                        <tr className="text-center">
                              <td className="px-4 py-2 text-center">01.</td>
                              <td className="px-4 py-2">Trivago</td>
                              <td className="px-4 py-2">$520</td>
                              <td className="px-4 py-2 text-green-500">+5%</td>
                        </tr>
                        <tr className="bg-gray-50 text-center">
                              <td className="px-4 py-2 text-center">02.</td>
                              <td className="px-4 py-2">Canon</td>
                              <td className="px-4 py-2">$480</td>
                              <td className="px-4 py-2 text-green-500">+10%</td>
                        </tr>
                        <tr className="text-center">
                              <td className="px-4 py-2 text-center">03.</td>
                              <td className="px-4 py-2">Uber Food</td>
                              <td className="px-4 py-2">$350</td>
                              <td className="px-4 py-2 text-red-500">-3%</td>
                        </tr>
                        <tr className="bg-gray-50 text-center">
                              <td className="px-4 py-2 text-center">04.</td>
                              <td className="px-4 py-2">Nokia</td>
                              <td className="px-4 py-2">$940</td>
                              <td className="px-4 py-2 text-green-500">+2%</td>
                        </tr>
                        <tr className="text-center">
                              <td className="px-4 py-2 text-center">05.</td>
                              <td className="px-4 py-2">Tiktok</td>
                              <td className="px-4 py-2">$670</td>
                              <td className="px-4 py-2 text-red-500">-12%</td>
                        </tr>
                        </tbody>
                        </table>
                  </div>
        </div>
      </div>
  )
};

export default Investments;
