import { Button, Grid2 } from "@mui/material";
import SideBar from "./SideBar";
import { MenuDashBoardProps } from "../../interface/interface";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GridViewIcon from "@mui/icons-material/GridView";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import EachMenuDashBoard from "./EachMenuDashBoard";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Outlet, useLocation } from "react-router-dom";
import { useCategory } from "./CategoryContext";
import { useFlower } from "./ProductContext";

const storeMenus: MenuDashBoardProps[] = [
  {
    title: "Dashboard",
    icon: <AccessTimeIcon className="iconEachMenuDashBoard"></AccessTimeIcon>,
    listText: ["Minimal", "Analytical", "Demographical", "Modern"],
    notification: <div className="blueNotification">4</div>,
    linkURL: "/admin",
  },
  {
    title: "Apps",
    icon: <GridViewIcon className="iconEachMenuDashBoard"></GridViewIcon>,
    listText: [],
    notification: null,
    linkURL: "/admin",
  },
  {
    title: "Inbox",
    icon: <MailOutlineIcon className="iconEachMenuDashBoard"></MailOutlineIcon>,
    listText: [],
    notification: null,
    linkURL: "/admin",
  },
  {
    title: "Ui Elements",
    icon: <ColorLensIcon className="iconEachMenuDashBoard"></ColorLensIcon>,
    listText: [],
    notification: <div className="orangeNotification">25</div>,
    linkURL: "/admin",
  },
  {
    title: "Categories",
    icon: <ColorLensIcon className="iconEachMenuDashBoard"></ColorLensIcon>,
    listText: [],
    notification: null,
    linkURL: "/admin/categoryManagement",
  },
  {
    title: "Products",
    icon: <ColorLensIcon className="iconEachMenuDashBoard"></ColorLensIcon>,
    listText: [],
    notification: null,
    linkURL: "/admin/productManagement",
  },
  {
    title: "Back to home",
    icon: null,
    listText: [],
    notification: null,
    linkURL: "/home",
  },
];
export default function DashBoard() {
  const [indexChange, setIndexChange] = useState<number>(-1);
  const { setOpenFillFormCategory } = useCategory();
  const { setOpenFillFormFlower } = useFlower();
  const handleSetIndexChange = (index: number) => {
    if (index == indexChange) {
      return;
    }
    setIndexChange(index);
  };
  const location = useLocation();
  const endPoint = location.pathname.split("/")[2];
  return (
    <Grid2 container size={12} className="mainDashBoard">
      <Grid2 size={2} className="leftDashBoard">
        <img
          src="/Lab1/Image/Header/logoDashBoard.png"
          alt="logo DashBoard"
          loading="lazy"
          className="logoDashBoard"
        ></img>
        <Grid2 className="menuDashBoard">
          {storeMenus.map((eachMenu, index) => (
            <EachMenuDashBoard
              eachMenu={eachMenu}
              key={index}
              isChose={indexChange == index ? true : false}
              onClick={() => handleSetIndexChange(index)}
            ></EachMenuDashBoard>
          ))}
        </Grid2>
      </Grid2>
      <Grid2 size={10}>
        <SideBar></SideBar>
        <Grid2 className="storetitleDashBoard" size={12} container>
          <Grid2 className="titleDashBoard" size={4}>
            DashBoard 1
          </Grid2>
          <Grid2 container size={8}>
            <Grid2 container size={9.5} className="storeLink">
              Home
              <KeyboardArrowRightIcon className="iconLink"></KeyboardArrowRightIcon>
              <Grid2 className="choseEachMenuDashBoard">DashBoard 1</Grid2>
            </Grid2>
            <Grid2 className="storeButtonLink" size={2.3}>
              <Button
                variant="contained"
                className="buttonLink"
                startIcon={<AddCircleIcon />}
                onClick={() => {
                  if (endPoint == "categoryManagement") {
                    return setOpenFillFormCategory(true);
                  }
                  return setOpenFillFormFlower(true);
                }}
              >
                Create New
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>

        <Grid2 className="bodyDashBoard">
          <Outlet />
        </Grid2>
        <Grid2 className="footer">
          &copy; 2021 Eliteadmin by themedesigner.in
          <span className="footerKun"> WrapPixel</span>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
