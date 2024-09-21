import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import dateDifference from "../../utils/dateDifference";
import {
  notificationCredit,
  notificationDebit,
  notificationFailed,
  notificationGrant,
  notificationLoan,
  notificationOffer,
} from "./NotificationIcons";

interface Notification {
  _id: string;
  accountNumber: number;
  message: string;
  read: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface NotificationResponse {
  notifications: Notification[];
  totalPages: number;
  currentPage: number;
  totalNotifications: number;
}

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

const Notifications: React.FC = () => {
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const [notificationData, setNotificationData] =
    useState<NotificationResponse>({
      notifications: [],
      totalPages: 0,
      currentPage: 0,
      totalNotifications: 0,
    });
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const initialFetchDoneRef = useRef(false); // Track if the initial fetch is done

  const fetchNotifications = async (page: number) => {
    if (loading || !hasMore) return;
    if (notificationData.currentPage === page) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `/api/notifications/${userData?.accountNumber}?page=${page}`
      );
      const newNotifications = response?.data;

      setNotificationData((prevData) => ({
        ...prevData,
        notifications: [
          ...prevData.notifications,
          ...newNotifications.notifications,
        ],
        currentPage: newNotifications.currentPage,
        totalPages: newNotifications.totalPages,
        totalNotifications: newNotifications.totalNotifications,
      }));
      setHasMore(newNotifications.currentPage < newNotifications.totalPages);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.accountNumber && !initialFetchDoneRef.current) {
      initialFetchDoneRef.current = true; // Mark the initial fetch as done
      fetchNotifications(1);
    }
  }, [userData?.accountNumber]);

  const getMoreNotifications = () => {
    if (notificationData.currentPage < notificationData.totalPages) {
      fetchNotifications(notificationData.currentPage + 1);
    }
  };

  if (notificationData.notifications.length === 0) return <div>...Loading</div>;

  return (
    <div className="p-4">
      {notificationData.notifications.map((notification) => (
        <div
          key={notification._id}
          className="flex items-center gap-2 p-4 border-b border-gray-300"
        >
          <div
            className={`w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center rounded-full p-1 ${
              iconsColors[notification?.type]
            }`}
          >
            <img
              src={icons[notification?.type]}
              alt={notification?.type}
              className=""
            />
          </div>
          <div className="flex-1">
            <h4 className="text-[#7a7b84] font-semibold text-[13px]">
              {notification?.type.toUpperCase()} -{" "}
              <span className="text-sm font-medium text-[#7a7b84] sm:hidden">
                {dateDifference(notification?.createdAt)}
              </span>
            </h4>
            <p className="text-[14px] text-[#343C6A] font-bold">
              {notification?.message}
            </p>
          </div>
          <span className="text-sm font-medium text-[#7a7b84] hidden sm:block">
            {dateDifference(notification?.createdAt)}
          </span>
        </div>
      ))}
      {hasMore && (
        <div
          onClick={getMoreNotifications}
          className="text-center mt-4 text-blue-500"
        >
          {loading ? "Loading more..." : "See More"}
        </div>
      )}
    </div>
  );
};

export default Notifications;
