import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react";
import {
  BanknotesIcon,
  Bars3Icon,
  BookOpenIcon,
  BriefcaseIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  HomeIcon,
  Square2StackIcon,
  UserIcon,
  UserPlusIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/16/solid";
import { Link, useLocation } from "react-router-dom";
import useResizeListener from "../hooks/resizeListener";

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
    href: "/credit-cards",
    label: "Credit Cards",
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
    href: "/my-privileges",
    label: "My Privileges",
    icon: UserPlusIcon,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Cog8ToothIcon,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const { width } = useResizeListener();

  return (
    <Menu>
      {width && width < 480 && (
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <Bars3Icon className="size-4 fill-white/60" />
        </MenuButton>
      )}
      <MenuItems
        className={`w-52 origin-top-right border border-black/2 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 ${
          !width || width >= 480 ? "h-screen sticky" : "rounded-xl"
        }`}
        static={!width || width >= 480}
        anchor="bottom start"
      >
        <MenuSection>
          <MenuHeading className="pl-3 text-left pb-3 pt-3">
            <Link to="/">
              <BanknotesIcon className="size-6 inline fill-indigo-600" />
              <span className="pl-1 font-bold text-lg">BankDash.</span>
            </Link>
          </MenuHeading>
          {sideLinks.map((navItem) => {
            const isactive = navItem.href === path;
            return (
              <MenuItem key={navItem.href}>
                <Link
                  className={`group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-white/10 ${
                    isactive ? "border-l-2 border-indigo-600" : ""
                  }`}
                  to={navItem.href}
                >
                  <navItem.icon
                    className={`size-5 ${
                      isactive ? "fill-indigo-600" : "fill-slate-400"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isactive ? "text-indigo-600" : "text-slate-400"
                    }`}
                  >
                    {navItem.label}
                  </span>
                </Link>
              </MenuItem>
            );
          })}
        </MenuSection>
      </MenuItems>
    </Menu>
  );
};

export default Sidebar;
