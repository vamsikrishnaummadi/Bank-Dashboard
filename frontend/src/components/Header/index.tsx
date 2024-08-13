import { useLocation, useNavigate} from "react-router-dom";
import { headerHamburgerIcon, headerSettingsIcon} from "./HeaderIcons";
import Searchbar from "./Searchbar";
import Notifications from "./BellIcon";
import ProfileMenu from "./ProfileMenu";

const getNavHeading = (path: string) => {
    if (path === "/") {
      return "Home";
    }
    return path
      .slice(1)
      .split("-")
      .map((item) => item[0].toUpperCase() + item.slice(1))
      .join(" ");
};

const Header: React.FC<{ setSidebarOpen: (open: boolean) => void}> = ({setSidebarOpen}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const navHeading = getNavHeading(location.pathname);

    const handleSettingsClick = () => {
        navigate("/settings/profile");
    };

      return(
         <header className="bg-white shadow-md px-4 pb-[9px] pt-[5px] flex justify-between items-center w-full z-10">
                <div className="flex items-center space-x-4">
                    <img
                        src={headerHamburgerIcon}
                        alt="hamburger icon"
                        className="h-4 w-4 text-gray-600 cursor-pointer md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    />
                    <div className="hidden sm:block text-lg font-semibold text-gray-700">{navHeading}</div>
                </div>
                <div className="text-lg font-semibold text-gray-700 sm:hidden">{navHeading}</div>
                <div className="flex items-center space-x-4 md:space-x-8">
                    <Searchbar />
                    <div className="rounded-full p-2 bg-lightgrey hover:bg-slate-300 hidden sm:block">
                        <img
                            src={headerSettingsIcon}
                            alt="settings icon"
                            className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
                            onClick={handleSettingsClick}
                        />
                    </div>
                    <Notifications />
                    <ProfileMenu />
                </div>
         </header>
      )
};

export default Header;