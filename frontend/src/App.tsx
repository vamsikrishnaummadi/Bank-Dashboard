import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accounts from "./components/Accounts";
import CreditCards from "./components/CreditCards";
import Investments from "./components/Investments";
import Loans from "./components/Loans";
import MyPrivileges from "./components/MyPrivileges";
import Overview from "./components/overview";
import Services from "./components/Services";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";
import Signin from "./components/Signin";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/auth/signin" element={<Signin />} />
         <Route path="*" 
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
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </DefaultLayout>
             }
             />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
