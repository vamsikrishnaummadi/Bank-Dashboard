import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accounts from "./components/Accounts";
import CreditCards from "./components/CreditCards";
import Investments from "./components/Investments";
import Loans from "./components/Loans";
import MyPrivileges from "./components/MyPrivileges";
import Overview from "./components/Overview";
import Services from "./components/Services";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Sidebar />
        <div>
          <Header />
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
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
