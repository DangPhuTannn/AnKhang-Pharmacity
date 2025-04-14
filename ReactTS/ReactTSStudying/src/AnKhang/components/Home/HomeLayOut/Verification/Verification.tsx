
import VerifiedIcon from "@mui/icons-material/Verified";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CachedSharpIcon from "@mui/icons-material/CachedSharp";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { Grid2 } from "@mui/material";
import EachVerification from "./EachVerification";
import "./../../../../css/Home/verification.css";
import { EachVerificationProps } from "../../../../Config/interface";

const listEachVerification: EachVerificationProps[] = [
  {
    image: <VerifiedIcon className="iconVerification" />,
    title: "Cam kết 100%",
    text: "thuốc chính hãng",
  },
  {
    image: <TwoWheelerIcon className="iconVerification" />,
    title: "Miễn phí giao hàng",
    text: "đơn hàng từ 150.000đ",
  },
  {
    image: <AccessTimeIcon className="iconVerification" />,
    title: "Giao nhanh 2 giờ",
    text: "Xem chi tiết",
  },
  {
    image: <CachedSharpIcon className="iconVerification" />,
    title: "Đổi trả trong 3 ngày",
    text: "Xem chi tiết",
  },
];
function Verification() {
  return (
    <>
      <Grid2 className="verification" size={12} container>
        {listEachVerification
          .slice(0, 2)
          .map(({ image, title, text }, index) => (
            <EachVerification
              image={image}
              title={title}
              text={text}
              key={index}
            ></EachVerification>
          ))}
        <Grid2 className="titleEachVerification" size={2.3}>
          {"Hệ thống 326 nhà thuốc an khang".toUpperCase()}
        </Grid2>
      </Grid2>

      <Grid2 className="verification" size={12} container>
        {listEachVerification
          .slice(2, 5)
          .map(({ image, title, text }, index) => (
            <EachVerification
              image={image}
              title={title}
              text={text}
              key={index}
            ></EachVerification>
          ))}
        <Grid2 className="buttonEachVerification" size={2.3}>
          Xem danh sách nhà thuốc
        </Grid2>
      </Grid2>
    </>
  );
}

export default Verification;
