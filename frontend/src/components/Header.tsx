// src/components/Header.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import hamburger from "../assets/hamburger.svg";
import notificationBell from "../assets/notificationBell.svg";
import searchicon from "../assets/searchicon.svg";
import settings from "../assets/settings.svg";
import { RootState } from '../store/store';

const getNavHeading = (path: string) => {
  if (path === "/") {
    return "Overview";
  }
  return path
    .slice(1)
    .split("-")
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(" ");
};

const Header: React.FC<{ setSidebarOpen: (open: boolean) => void}> = ({ setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const userData = useSelector((state: RootState) => state.user.userData);
  const navHeading = getNavHeading(location.pathname);

  const notifications = [
    'Notification 1',
    'Notification 2',
    'Notification 3',
    'Notification 4',
    'Notification 5',
    'Notification 6',
  ];
  
  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleProfileMenuClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logged out');
  };

  return (
    <header className="bg-white shadow-md px-4 py-2 flex justify-between items-center w-full z-10 border">
      <div className="flex items-center space-x-4">
        <img src={hamburger} alt='hamburger icon' className="h-4 w-4 text-gray-600 cursor-pointer md:hidden" onClick={() => setSidebarOpen(true)} />
        <div className="text-lg font-semibold text-gray-700">
          {navHeading}
        </div>
      </div>
      <div className="flex items-center space-x-4 md:space-x-8">
        <div className="relative hidden md:flex flex-row items-center gap-3 bg-lightgrey rounded-full px-4 py-2 border border-gray-300">
          <img src={searchicon} alt="search icon" className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search for something"
            className="focus:outline-none bg-transparent placeholder-[#8BA3CB] text-[#8BA3CB]"
          />
        </div>
        <div className='rounded-full p-2 bg-lightgrey'>
            <img src={settings} alt="settings icon" className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800" onClick={handleSettingsClick} />
        </div>
        <div className="relative">
          <div className='rounded-full p-2 bg-lightgrey'>
              <img src={notificationBell} alt="notification bell icon" className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800" onClick={handleNotificationClick} />
          </div>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg">
              <ul className="p-2">
                {notifications.map((notification, index) => (
                  <li key={index} className="p-2 hover:bg-gray-100">{notification}</li>
                ))}
                <li className="p-2 text-center text-blue-500 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/notifications')}>
                  Show all notifications
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <span
            className="w-10 h-10 p-2 rounded-full border-2 bg-lightgrey border-gray-300 cursor-pointer hover:border-indigo-500 flex items-center justify-center text-lg font-bold"
            onClick={handleProfileMenuClick}
          >
            {userData?.user?.userName[0].toUpperCase()}
          </span>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
              <ul className="p-2">
                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleSettingsClick}>Settings</li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
                {/* Add more profile options as needed */}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
