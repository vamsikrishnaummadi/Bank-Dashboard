import { useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Accounts from "./components/Accounts/index";
import CreditCards from "./components/CreditCards";
import Investments from "./components/Investments";
import Loans from "./components/Loans/index";
import MyPrivileges from "./components/MyPrivileges";
import Overview from "./components/overview";
import Services from "./components/Services/index";
import Settings from "./components/Settings/index";
import Signin from "./components/Signin";
import Transactions from "./components/transactions";
import DefaultLayout from "./layout/DefaultLayout";
import Notifications from "./components/Notifications/index";

function App() {

  useEffect(() => {
    const handleUnload = () => {
      Cookies.remove('access_token');
    };
  
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/signin" element={<Signin />} />
        <Route
          path="*"
          element={
            <DefaultLayout>
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/credit-cards" element={<CreditCards />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/services" element={<Services />} />
                <Route path="/my-privileges" element={<MyPrivileges />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings/:tab" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </DefaultLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
