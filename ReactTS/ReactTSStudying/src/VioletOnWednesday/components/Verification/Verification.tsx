import { Grid2 } from "@mui/material";
import { EachVerificationProps } from "../../interface/interface";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MessageIcon from "@mui/icons-material/Message";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EachVerification from "./EachVerification";
import "./../../css/verification.css";
export default function Verification() {
  const storeEachVerification: EachVerificationProps[] = [
    {
      icon: (
        <LocalShippingIcon className="iconVerification"></LocalShippingIcon>
      ),
      title: "GIAO HÀNG MIỄN PHÍ",
      text: "Chúng tôi giao hàng miễn phí trong nội thành",
    },
    {
      icon: <MessageIcon className="iconVerification"></MessageIcon>,
      title: "TƯ VẤN TẬN TÂM",
      text: "Mang đến cho Quý Khách những sản phẩm tốt nhất",
    },
    {
      icon: <AttachMoneyIcon className="iconVerification"></AttachMoneyIcon>,
      title: "GIÁ THÀNH TỐT NHẤT",
      text: "Cam kết giá thành & dịch vụ sau bán hàng tốt nhất",
    },
  ];
  return (
    <div className="storeVerification">
      <Grid2 spacing={1} container>
        {storeEachVerification.map(({ icon, title, text }, index) => (
          <EachVerification
            icon={icon}
            title={title}
            text={text}
            key={index}
          ></EachVerification>
        ))}
      </Grid2>
    </div>
  );
}
