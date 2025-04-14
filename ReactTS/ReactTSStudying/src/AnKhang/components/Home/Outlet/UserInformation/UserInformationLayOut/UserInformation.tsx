import { Container } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PinDropIcon from "@mui/icons-material/PinDrop";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import InventoryIcon from "@mui/icons-material/Inventory";
import MedicationIcon from "@mui/icons-material/Medication";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BreadcumsUserInformation from "../BreadcumsUserInformation";
import "./../../../../../css/Home/Outlet/User/userInformation.css";
import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../GlobalUtils/AuthContext";
export default function UserInformation() {
  const navigate = useNavigate();
  const { setUser, setToken ,user} = useAuth();
  const [pickedIndex, setPickedIndex] = useState(0);
  const location = useLocation();
  const getEndpoint = location.pathname.split("/")[3];
  const getIndex = ["myProfile", "myOrder", "myAddress"].findIndex(
    (eachEndpoint) => eachEndpoint == getEndpoint
  );

  if (getIndex != pickedIndex) {
    setPickedIndex(getIndex);
  }

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
        name: "Quản lý sổ địa chỉ",
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
    <Container className="pb-[20px] relative">
      <BreadcumsUserInformation />
      <div className="flex gap-[1.25rem]">
        <div className="leftContainerUserInfor">
          <div className="storePropsInforContainer">
            <div className="storePropsInfor">
              <div className="w-[70px] h-[70px]">
                <img src="/AnKhang/avatarDefault.png"></img>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-[16px] mb-[5px] ">
                  {user?.email}
                </div>
                <div className="text-white text-[14px]">{user?.phone}</div>
              </div>
            </div>
          </div>
          <div className="storeUserOptionsInfor">
            <ul>
              {storeUserOptionsUI.map(
                ({ icon, name, specificFunction }, index) => (
                  <li
                    onClick={() => specificFunction()}
                    className={`flex justify-between items-center px-[12px] py-[16px] ${
                      pickedIndex == index && "pickedUserOptionInfor"
                    }`}
                    key={index}
                  >
                    <div className="flex gap-[10px] items-center">
                      <div>{icon}</div>
                      <div className="text-[15px]">{name}</div>
                    </div>
                    <ArrowForwardIosIcon className="scale-70" />
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="rightContainerUserInfor">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}
