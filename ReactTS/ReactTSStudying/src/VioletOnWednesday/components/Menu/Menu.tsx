import { Container, Grid2 } from "@mui/material";
import EachMenu from "./EachMenu";
import "./../../css/menu.css";
function Menu() {
  const storeTitles: string[] = [
    "TRANG CHỦ",
    "HOA SINH NHẬT",
    "HOA TÌNH YÊU",
    "HOA CHÚC MỪNG",
    "HOA VĂN PHÒNG",
    "CHỦ ĐỀ",
    "THIẾT KẾ",
    "THỂ LOẠI",
    "QUÀ TẶNG",
  ];
  return (
    <div className="menu">
      <Container>
        <Grid2 size={12} container className="storeEachMenu" spacing={3} >
            {storeTitles.map((eachTitle,index) => (
              <EachMenu title={eachTitle} key={index}></EachMenu>
            ))}
         
        </Grid2>
      </Container>
    </div>
  );
}

export default Menu;
