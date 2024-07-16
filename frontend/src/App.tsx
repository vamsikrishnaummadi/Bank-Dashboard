import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accounts from "./components/Accounts";
import CreditCards from "./components/CreditCards";
import Header from "./components/Header";
import Investments from "./components/Investments";
import Loans from "./components/Loans";
import MyPrivileges from "./components/MyPrivileges";
import Overview from "./components/overview";
import Services from "./components/Services";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import Transactions from "./components/Transactions";
import useResizeListener from "./hooks/resizeListener";

function App() {
  const { width } = useResizeListener();
  return (
    <BrowserRouter>
      <div
        className={!width || width >= 480 ? "flex flex-row" : "flex flex-row"}
      >
        {(!width || width >= 480) && (
          <>
            <div className="w-52"></div>
            {/* empty div is needed to handle sidebar position */}
            <Sidebar />
          </>
        )}
        <div className="flex-1">
          <Header />
          <div className="p-4 bg-slate-200">
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
      </div>
    </BrowserRouter>
  );
}

export default App;
