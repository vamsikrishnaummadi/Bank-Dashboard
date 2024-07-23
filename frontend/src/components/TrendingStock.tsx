import { useEffect, useState } from 'react';

import axios from 'axios';

const TrendingStock = () =>{
    const [stocks, setStocks] = useState([]); 

    useEffect(() => {
        const fetchStocks = async () => {
          try {
            const response = await axios.get('/api/stock/trending-stocks');
            setStocks(response.data);
            
          } catch (error) {
            console.error("Error fetching trending stocks:", error);
          }
        };
    
        fetchStocks();
      }, []);


    return(
       <div className='fixed bottom-4 right-4 bg-white p-6 rounded-lg shadow-md w-full sm:w-96'> 
           <h2 className='text-2xl font-semibold mb-4'>Trending Stock</h2>
           <table className='min-w-full bg-white'>
              <thead>
                <tr>
                    <th className='py-2 px-4 border-b border-gray-200'>SL No</th> 
                    <th className='py-2 px-4 border-b border-gray-200'>Name</th> 
                    <th className='py-2 px-4 border-b border-gray-200'>Price</th> 
                    <th className='py-2 px-4 border-b border-gray-200'>Return</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock, index) => (
                    <tr key={stock.id}>
                        <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{stock.name}</td>
                        <td className="py-2 px-4 border-b border-gray-200">${stock.price}</td>
                        <td className={`py-2 px-4 border-b border-gray-200 ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.change > 0 ? `+${stock.change}%` : `${stock.change}%`}
                        </td>
                    </tr>
                ))}
              </tbody>
           </table>

       </div>
    )
}
export default TrendingStock;