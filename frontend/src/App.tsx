import Cookies from "js-cookie";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Accounts from "./components/Accounts/index";
import CardDetails from "./components/card-details/index";
import Investments from "./components/Investments";
import Loans from "./components/Loans/index";
import MyPrivileges from "./components/MyPrivileges";
import Notifications from "./components/Notifications/index";
import Overview from "./components/overview";
import PaymentCards from "./components/payment-cards";
import Services from "./components/Services/index";
import Settings from "./components/Settings/index";
import Signin from "./components/Signin";
import Transactions from "./components/transactions";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  useEffect(() => {
    const handleUnload = () => {
      Cookies.remove("access_token");
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
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
                <Route path="/payment-cards" element={<PaymentCards />} />
                <Route
                  path="/card-details/:cardNumber"
                  element={<CardDetails />}
                />
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
