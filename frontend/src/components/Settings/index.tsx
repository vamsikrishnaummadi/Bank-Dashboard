import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import Preferences from "./Preferences";
import Security from "./Security";

const getTabFromPath = (pathname) => {
    return pathname.split("/")[2] || "profile";
};

const Settings: React.FC = () => {
    const userData = useSelector((state: RootState) => state?.user?.userData);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(getTabFromPath(location.pathname));

    useEffect(() => {
        setActiveTab(getTabFromPath(location.pathname));
    }, [location.pathname]);
  
    const handleTabClick = (tab: string) => {
      setActiveTab(tab);
      navigate(`/settings/${tab}`);
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex mb-6 border-b border-gray-200">
                <button
                    className={`py-2 px-4 ${activeTab === 'profile' ? 'border-b-4 rounded-b-sm border-[#1814F3] text-[#1814F3] font-medium' : 'text-[#718EBF] font-medium'}`}
                    onClick={() => handleTabClick('profile')}
                >
                    User Profile
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'preferences' ? 'border-b-4 rounded-b-sm border-[#1814F3] text-[#1814F3] font-medium' : 'text-[#718EBF] font-medium'}`}
                    onClick={() => handleTabClick('preferences')}
                >
                    Preferences
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'security' ? 'border-b-4 rounded-b-sm border-[#1814F3] text-[#1814F3] font-medium' : 'text-[#718EBF] font-medium'}`}
                    onClick={() => handleTabClick('security')}
                >
                    Security
                </button>
            </div>
    
            {activeTab === 'profile' && <UserProfile userData={userData} />}
            {activeTab === 'preferences' && <Preferences userData={userData}/>}
            {activeTab === 'security' && <Security userData={userData}/>}
        </div>
    );
  };

export default Settings;
  