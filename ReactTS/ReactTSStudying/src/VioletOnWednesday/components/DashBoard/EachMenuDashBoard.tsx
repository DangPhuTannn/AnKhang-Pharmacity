import { Grid2 } from "@mui/material";
import { MenuDashBoardProps } from "../../interface/interface";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function EachMenuDashBoard({
  eachMenu,
  isChose,
  onClick,
}: {
  eachMenu: MenuDashBoardProps;
  isChose: boolean;
  onClick: () => void;
}) {
  const { title, icon, listText, notification } = eachMenu;
  const [indexChange, setIndexChange] = useState<number>(-1);
  const handleSetIndexChange = (index: number) => {
    setIndexChange(index);
  };
  const navigate = useNavigate();
  return (
    <>
      <Grid2
        container
        spacing={4}
        className={`eachMenuDashBoard ${
          isChose ? "choseEachMenuDashBoard" : ""
        }`}
        size={12}
        onClick={() => {
          onClick();
          navigate(`${eachMenu.linkURL}`);
        }}
      >
        <Grid2 size={1}>{icon}</Grid2>
        <Grid2 size={9}>{title}</Grid2>
        {notification}
        <KeyboardArrowRightIcon
          className={`arrowChoseIconMenu${isChose ? " choseArrow" : ""}`}
        ></KeyboardArrowRightIcon>
      </Grid2>
      {isChose && listText.length != 0 && (
        <Grid2 size={12} className="subMenuDashBoard">
          {listText.map((eachSubMenu, index) => (
            <Grid2
              className={`eachSubMenu ${
                indexChange == index ? "choseEachMenuDashBoard" : ""
              }`}
              key={index}
              onClick={() => handleSetIndexChange(index)}
            >
              {eachSubMenu}
            </Grid2>
          ))}
        </Grid2>
      )}
    </>
  );
}
