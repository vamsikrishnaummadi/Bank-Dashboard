import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { clearUser } from "../../store/userSlice";
import { useState } from "react";

const ProfileMenu: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state : RootState) => state?.user?.userData);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        Cookies.remove("access_token");
        dispatch(clearUser());
        navigate("/auth/signin");
    };

    const handleProfileMenuClick = () => {
        setShowProfileMenu(!showProfileMenu);
    }

    const handleSettingsClick = (tab: string ) => {
        navigate(`/settings/${tab}`);
    }
    
    return (
        <div className="relative" onClick={handleProfileMenuClick}>
            {userData?.profileImage ? (
                <img 
                    className="w-10 h-10 rounded-full hover:border-2 hover:border-indigo-700 object-cover cursor-pointer" 
                    src={userData?.profileImage} 
                    alt="profile image" 
                />
            ) : (
                <span className="w-10 h-10 p-2 rounded-full border-2 bg-lightgrey border-gray-300 cursor-pointer hover:border-indigo-500 flex items-center justify-center text-lg font-bold">
                    {userData?.user?.userName[0].toUpperCase()}
                </span>
            )}
            {showProfileMenu && (
                <div
                    onBlur={handleProfileMenuClick}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
                >
                    <ul className="p-2">
                        <li className="p-2 hover:bg-gray-100 font-semibold cursor-pointer">welcome, {userData?.userName}</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSettingsClick('profile')}> Profile</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSettingsClick('preferences')}> Preferences</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSettingsClick('security')}>Security</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}> Logout </li>
                    </ul>
            </div>
            )}
      </div>
     )
}

export default ProfileMenu;