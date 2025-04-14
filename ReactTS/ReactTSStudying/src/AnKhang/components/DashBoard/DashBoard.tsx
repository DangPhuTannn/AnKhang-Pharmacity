import { useMemo, useState } from "react";
import {
  Pill,
  Logs,
  ChartBarStacked,
  UserCog,
  LogOut,
  Menu,
} from "lucide-react";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import "./../../css/DashBoard/DashBoard.css";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../GlobalUtils/AuthContext";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState("Overview");
  const { setUser, setToken } = useAuth();
  const menuItems = useMemo(() => {
    return [
      {
        title: "Overview",
        icon: <SsidChartIcon />,
        url: "/admin",
      },
      {
        title: "Product Management",
        icon: <Pill />,
        url: "/admin/productManagement",
      },
      {
        title: "Order Management",
        icon: <Logs />,
        url: "/admin/orderManagement",
      },
      {
        title: "Attribute Management",
        icon: <ChartBarStacked />,
        url: "/admin/attributeManagement",
      },
      {
        title: "User Management",
        icon: <UserCog />,
        url: "/admin/userManagement",
      },
      {
        title: "Log Out",
        icon: <LogOut />,
        url: "/",
      },
    ];
  }, []);

  return (
    <div className="flex  bg-[#4cb551] h-fit">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <div
        className={`transition-all duration-300 shadow-[-4px_1px_15px_6px_#8c8282] ${
          isSidebarOpen ? "z-[2]" : "z-[0]"
        }`}
        style={{ width: isSidebarOpen ? "17%" : "0px" }}
      >
        <div className=" p-4 h-[100px]">
          <img
            src="/logoAnKhang.png"
            alt="logo AnKhang"
            className="w-full h-full object-contain"
          />
        </div>
        <ul className="space-y-2 mt-[10px]">
          {menuItems.map(({ title, icon, url }, index) => (
            <li key={index} onClick={() => setSelectedTitle(title)}>
              <Link
                to={url}
                onClick={() => {
                  if (title == "Log Out") {
                    setUser(null);
                    setToken(null);
                  }
                }}
                className={`flex items-center gap-[10px] text-[17px] font-bold p-4 rounded cursor-pointer transition-all duration-300 text-white ${
                  selectedTitle === title
                    ? "bg-[#3A8E40]"
                    : " hover:bg-[#2E7D32]"
                }`}
              >
                {icon}
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-[20px] pb-0 pt-[10px] bg-gray-100 transition-all duration-300 shadow-inner z-[1]">
        <div className="flex items-center justify-between bg-[#4cb551] text-white p-2 shadow-md rounded-lg">
          <Menu
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="cursor-pointer"
          />
          <h2 className="text-3xl font-semibold">{selectedTitle}</h2>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
        <div className="shadow-lg  mt-3 overflow-x-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
