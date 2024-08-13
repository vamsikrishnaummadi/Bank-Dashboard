import { headerSearchIcon } from "./HeaderIcons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const searchData = [
    { text: "Dashboard", route: "/" },
    { text: "Settings", route: "/settings" },
    { text: "Profile", route: "/profile" },
    { text: "Notifications", route: "/notifications" },
    { text: "Overview", route: "/"},
    {text : "Transactions", route: "/transactions"},
    {text : "Accounts", route: "/accounts"},
    {text : "Investments", route: "/investments"},
    {text : "Payment cards", route: "/credit-cards"},
    {text : "Loans", route: "/laons"},
    {text : "Services", route: "/services"},
    {text : "My Cards", route: "/"},
    {text : "Recent Transactions", route: ""},
    {text : "Weekly Activity", route: ""},
    {text : "Recent Transactions", route: ""},
    // Add more entries as needed
  ];

const Searchbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    
    const filteredSearchResults = searchData.filter((item) =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchResultClick = (route: string) => {
        setSearchQuery("");
        navigate(route);
    };

    return (
        <div className="relative hidden md:flex flex-row items-center gap-3 bg-lightgrey rounded-full px-4 py-2 border border-gray-300 active:border-indigo-600 active:border hover:border hover:border-indigo-600">
          <img
            src={headerSearchIcon}
            alt="search icon"
            className="w-4 h-4 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search for something"
            className="focus:outline-none bg-transparent placeholder-[#8BA3CB] text-[#8BA3CB]"
            onChange={handleSearchChange}
          />
           {searchQuery && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md">
              {filteredSearchResults.length > 0 ? (
                filteredSearchResults.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSearchResultClick(item.route)}
                  >
                    {item.text}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>
    )
};

export default Searchbar;