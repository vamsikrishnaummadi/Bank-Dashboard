import { useLocation } from "react-router-dom";
import useResizeListener from "../hooks/resizeListener";
import Notifications from "./Notifications";
import Sidebar from "./Sidebar";
import User from "./User";

const getNavHeading = (path: string) => {
  if (path === "/") {
    return "Overview";
  }
  return path
    .slice(1)
    .split("-")
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(" ");
};

const Header = () => {
  const location = useLocation();
  const navHeading = getNavHeading(location.pathname);
  const { width } = useResizeListener();

  return (
    // <div className="header">
    //   {width && width < 480 && <Sidebar />}
    //   <h3>{navHeading}</h3>
    //   <Notifications />
    // </div>
    <header className="sticky top-0 flex bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {width && width < 480 && <Sidebar />}
            <h3 className="font-medium">{navHeading}</h3>
          </ul>
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <Notifications />
            <User />
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;
