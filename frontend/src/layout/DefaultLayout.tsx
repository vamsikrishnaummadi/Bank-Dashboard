// src/layouts/DefaultLayout.tsx
import Cookies from "js-cookie";
import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { RootState } from "../store/store";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user.userData);
  const token = Cookies.get("access_token");

  useEffect(() => {
    if (!userData.user && !token) {
      navigate("/auth/signin");
    }
  }, [userData, token, navigate]);

     return (
        <div className='flex h-screen overflow-hidden w-screen'>
            <div className='md:w-56'>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className='w-full flex flex-col flex-1'>
                <Header  setSidebarOpen={setSidebarOpen} />
                <main className='overflow-y-auto w-full bg-[#F5F7FA]'>
                    <div className='mx-auto p-4 md:p-6 2xl:p-10 mt-2'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
     )
};

export default DefaultLayout;
