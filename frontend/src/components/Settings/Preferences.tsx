import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const Preferences: React.FC<{userData : object | null}> = ({userData}) => {
    const [formData, setFormData] = useState({
        currency : '',
        timeZone : '',
        enableDigitalCurrency : false,
        enableNotifications: false,
        enableRecomendations: false 
    });

    const dispatch = useDispatch();

    useEffect(() => {
      if (userData) {
        setFormData({
          currency: userData?.currency || '',
          timeZone: userData?.timeZone || '',
          enableDigitalCurrency: userData?.enableDigitalCurrency || false,
          enableNotifications: userData?.enableNotifications || false,
          enableRecomendations: userData?.enableRecomendations || false
        });
      }
    }, [userData]);

    const checkChanges = () => {
     for (const key in formData) {
       if (formData[key as keyof typeof formData]  !== userData[key as keyof typeof userData]) {
          return true;
       }
     }
     return false;
   };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (checkChanges()){
      try {
        const response = await axios.put(`/api/users/${userData?.accountNumber}`, formData);
        if (response.status === 200) {
          const updatedUser = { user: response.data.data, accessToken: userData?.accessToken };
          dispatch(setUser(updatedUser));
          alert("Preferences updated successfully.");
        }
      } catch (error) {
        console.error("Error updating preferences: ", error);
        alert("Failed to update preferences.");
      }
     }else {
       alert("There is no changes to Save");
     }
    };
  
 return (
   <form onSubmit={handleSubmit}>
     <div className="w-full md:w-6/6 px-4">
       <div className='flex flex-wrap -mx-4'>
         <div className="w-full md:w-1/2 px-4 mb-4">
           <label className="block text-[#333B69] text-md font-semibold mb-2" htmlFor="currency">
             Currency
           </label>
           <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-[#718EBF] text-[#718EBF]"
              id="currency" 
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              >
             <option value="USD">USD</option>
             <option value="EUR">EUR</option>
             <option value="GBP">GBP</option>
             <option value="JPY">JPY</option>
             <option value="CAD">CAD</option>
             <option value="CHF">CHF</option>
             <option value="CNF">CNY</option>
             <option value="INR" selected>INR</option>
             <option value="GBP">GBP</option>
             <option value="BRL">BRL</option>
           </select>
         </div>
         <div className="w-full md:w-1/2 px-4 mb-4">
           <label className="block text-[#333B69] text-md font-semibold mb-2" htmlFor="timeZone">
             Time Zone
           </label>
           <select 
             className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-[#718EBF] text-[#718EBF]" 
             id="timeZone" 
             name="timeZone"
             value={formData.timeZone}
             onChange={handleChange}
           >
             <option value="pst">PST</option>
             <option value="mst">MST</option>
             <option value="cst">CST</option>
             <option value="est">EST</option>
           </select>
         </div>
       </div>
     </div>
     <div className="mb-4 px-4">
       <h3 className="text-[#333B69] text-md font-semibold mb-2">Notifications</h3>
       <div className="flex items-center mb-2">
         <label className="inline-flex items-center cursor-pointer" htmlFor='enableDigitalCurrency'>
             <input 
               type="checkbox" 
               id="enableDigitalCurrency" 
               name="enableDigitalCurrency" 
               checked={formData.enableDigitalCurrency}
               onChange={handleChange}
               className="sr-only peer"
             />
             <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:peer-focus:ring-[#16DBCC] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16DBCC]"></div>
             <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">I send or receive digital currency</span>
         </label>
       </div>
       <div className="flex items-center mb-2">
           <label className="inline-flex items-center cursor-pointer" htmlFor='enableNotifications'>
             <input 
               type="checkbox" 
               id="enableNotifications" 
               name="enableNotifications" 
               checked={formData.enableNotifications}
               onChange={handleChange}
               className="sr-only peer"
             />
             <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:peer-focus:ring-[#16DBCC] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16DBCC]"></div>
             <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">I receive merchant order</span>
           </label>
       </div>
       <div className="flex items-center mb-2">
           <label className="inline-flex items-center cursor-pointer" htmlFor='enableRecomendations'>
             <input 
               type="checkbox" 
               id="enableRecomendations" 
               name="enableRecomendations" 
               checked={formData.enableRecomendations}
               onChange={handleChange}
               className="sr-only peer"
             />
             <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:peer-focus:ring-[#16DBCC] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16DBCC]"></div>
             <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">There are recommendations for my account</span>
           </label>
       </div>
     </div>
     <div className="w-full flex md:justify-end">
           <button type="submit" className="w-full md:w-32 px-4 py-2 bg-[#1814F3] text-white rounded-lg">Save</button>
     </div>
   </form>
 );
};


export default Preferences;