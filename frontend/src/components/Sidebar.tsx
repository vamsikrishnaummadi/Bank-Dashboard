// src/components/Sidebar.tsx
import {
  BookOpenIcon,
  BriefcaseIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  HomeIcon,
  Square2StackIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/16/solid";
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.svg";

const sideLinks = [
  {
    href: "/",
    label: "Overview",
    icon: HomeIcon,
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: Square2StackIcon,
  },
  {
    href: "/accounts",
    label: "Accounts",
    icon: UserIcon,
  },
  {
    href: "/investments",
    label: "Investments",
    icon: BookOpenIcon,
  },
  {
    href: "/payment-cards",
    label: "Payment Cards",
    icon: CreditCardIcon,
  },
  {
    href: "/loans",
    label: "Loans",
    icon: BriefcaseIcon,
  },
  {
    href: "/services",
    label: "Services",
    icon: WrenchScrewdriverIcon,
  },
  {
    href: "/settings/profile",
    label: "Settings",
    icon: Cog8ToothIcon,
  },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <aside className="md:w-56">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:w-56 md:h-screen md:fixed md:top-0 md:left-0 md:bg-white md:border-r md:border-gray-200 md:shadow-lg">
        <div className="flex flex-col items-center justify-start px-5 py-2 h-14 border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(false)}
            className="mb-2 text-[#1814F3] md:hidden"
          >
            Close
          </button>
          <NavLink to="/">
            <img src={logo} alt="Logo" className="h-6" />
          </NavLink>
        </div>
        <nav className="flex-1 p-4">
          {sideLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-100 rounded-md ${
                  isActive
                    ? "bg-blue-100 border-l-4 border-[#1814F3] text-[#1814F3]"
                    : ""
                }`
              }
            >
              <link.icon className="h-6 w-6 mr-3" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-50 md:z-0 flex md:hidden bg-black bg-opacity-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out`}
      >
        <div className="w-56 bg-white shadow-lg p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="mb-2 text-[#1814F3]"
          >
            Close
          </button>
          <div className="flex items-center justify-center px-5 py-2 h-14 border-b border-gray-200">
            <img src={logo} alt="Logo" className="h-8" />
          </div>
          <nav className="flex-1 p-2">
            {sideLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-100 rounded-md ${
                    isActive
                      ? "bg-blue-100 border-l-4 border-[#1814f3] text-[#1814F3]"
                      : ""
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <link.icon className="h-6 w-6 mr-3" />
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex-1" onClick={() => setSidebarOpen(false)}></div>
      </div>
    </aside>
  );
};

export default Sidebar;
