import React from "react";

const TrendingStock:React.FC = () => {
     return (
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
     )
};

export default TrendingStock;