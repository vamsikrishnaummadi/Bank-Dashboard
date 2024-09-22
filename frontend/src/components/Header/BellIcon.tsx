import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import {
  headerNotificationBellIcon,
  notificationCredit,
  notificationDebit,
  notificationFailed,
  notificationGrant,
  notificationLoan,
  notificationOffer,
} from "./HeaderIcons";

const icons: { [key: string]: string } = {
  grant: notificationGrant,
  loan: notificationLoan,
  offer: notificationOffer,
  credit: notificationCredit,
  debit: notificationDebit,
  failed: notificationFailed,
};

const iconsColors: { [key: string]: string } = {
  credit: "bg-green-300",
  debit: "bg-red-300",
  offer: "bg-purple-300",
  failed: "bg-red-400",
  loan: "bg-yellow-400",
  grant: "bg-green-400",
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const BellIcon: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state?.user?.userData);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const fetchNotifications = async () => {
    fetch(`${apiBaseUrl}/notifications/` + userData?.accountNumber + "?limit=5")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data?.notifications);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative" onClick={handleNotificationClick}>
      <div className="rounded-full p-2 bg-lightgrey hover:bg-slate-300">
        <img
          src={headerNotificationBellIcon}
          alt="notification bell icon"
          className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
        />
      </div>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="p-2">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 flex gap-2 items-center"
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full p-1 ${
                    iconsColors[notification?.type]
                  }`}
                >
                  <img
                    src={icons[notification?.type]}
                    alt={notification?.type}
                    className=""
                  />
                </div>
                <div>
                  <h4 className="text-[#343C6A] font-semibold text-[13px]">
                    {notification?.type.toUpperCase()}
                  </h4>
                  <p className="text-[12px]">
                    {notification?.message.slice(0, 26)}
                    {notification?.message.length > 26 && "..."}
                  </p>
                </div>
              </li>
            ))}
            <li
              className="p-2 text-center text-blue-500 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/notifications")}
            >
              Show all notifications
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BellIcon;
