// src/layouts/DefaultLayout.tsx
import React, {useState, ReactNode, useEffect} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Cookies from 'js-cookie';

interface DefaultLayoutProps {
    children : ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({children}) => {
     const [sidebarOpen, setSidebarOpen] = useState(false);
     const navigate = useNavigate();
     const userData = useSelector((state: RootState) => state.user.userData);
     const token = Cookies.get('access_token');
   
     useEffect(() => {
       if (!userData && !token) {
         navigate('/auth/signin');
       }
     }, [userData,token, navigate]);

     return (
        <div className='flex h-screen overflow-hidden w-screen'>
            <div className='md:w-56'>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className='w-full flex flex-col flex-1'>
                <Header  setSidebarOpen={setSidebarOpen} />
                <main className='overflow-y-auto w-full'>
                    <div className='mx-auto p-4 md:p-6 2xl:p-10 mt-2'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
     )
};

export default DefaultLayout;
