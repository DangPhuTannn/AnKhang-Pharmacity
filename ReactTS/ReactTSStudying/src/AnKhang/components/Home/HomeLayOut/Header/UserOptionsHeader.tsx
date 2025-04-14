import "./../../../../css/Home/Outlet/User/userOptionsHeader.css";
import PersonIcon from "@mui/icons-material/Person";
import PinDropIcon from "@mui/icons-material/PinDrop";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import InventoryIcon from "@mui/icons-material/Inventory";
import MedicationIcon from "@mui/icons-material/Medication";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../../../../GlobalUtils/AuthContext";

export default function UserOptionsHeader() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const storeUserOptionsUI = useMemo(() => {
    return [
      {
        icon: <PersonIcon />,
        name: "Thông tin cá nhân",
        specificFunction: () => navigate("/home/myInfor/myProfile"),
      },
      {
        icon: <ShoppingCartCheckoutIcon />,
        name: "Đơn hàng của tôi",
        specificFunction: () => navigate("/home/myInfor/myOrder"),
      },
      {
        icon: <PinDropIcon />,
        name: "Số địa chỉ nhận hàng",
        specificFunction: () => navigate("/home/myInfor/myAddress"),
      },
      {
        icon: <VaccinesIcon />,
        name: "Lịch hẹn tiêm chủng",
        specificFunction: () => navigate("/home/myInfor/myProfile"),
      },
      {
        icon: <InventoryIcon />,
        name: "Đơn hàng tiêm chủng",
        specificFunction: () => navigate("/home/myInfor/myProfile"),
      },
      {
        icon: <MedicationIcon />,
        name: "Đơn thuốc của tôi",
        specificFunction: () => navigate("/home/myInfor/myProfile"),
      },
      {
        icon: <LogoutIcon />,
        name: "Đăng xuất",
        specificFunction: () => {
          setUser(null);
          setToken(null);
          navigate("/");
        },
      },
    ];
  }, []);

  return (
    <div className="userOptionsHeaderContainer">
      <ul className="userOptionsHeader text-[#4a4f63]">
        {storeUserOptionsUI.map(({ icon, name, specificFunction }, index) => (
          <li
            key={index}
            onClick={specificFunction}
            className="flex items-center gap-[5px] py-[12px]  pl-[13px] pr-[8px] hover:bg-[#4cb551] hover:text-white"
          >
            <div className="w-[25px] h-[25px]">{icon}</div>
            <div className="text-[15px]">{name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
