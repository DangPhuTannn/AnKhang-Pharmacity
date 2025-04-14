import { Container, Grid2 } from "@mui/material";
import { InforContactProps, EachContactProps } from "../../interface/interface";
import "./../../css/footer.css";
import EachContact from "./EachContact";
import InforContact from "./InforContact";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
export default function FormContact() {
  const storeContacts: EachContactProps[] = [
    {
      title: "HỆ THỐNG",
      listContacts: [
        "Hoa sinh nhật",
        "Hoa cưới",
        "Hoa chúc mừng",
        "Chủ đề",
        "Thiết kế",
        "Hoa theo thể loại",
        "Quà tặng",
      ],
    },
    {
      title: "CÔNG TY",
      listContacts: [
        "Giới thiệu",
        "Tin tức",
        "Tuyển dụng",
        "Chính sách nhân viên",
        "Chương trình khuyến mãi",
      ],
    },
    {
      title: "CÔNG TY",
      listContacts: [
        "Hướng dẫn đặt hàng",
        "Phương thức thanh toán",
        "Điều khoản mua hàng",
        "Phí vận chuyển",
        "Ý nghĩa các loài hòa",
        "Chăm sóc và bảo quản hoa",
      ],
    },
  ];
  const storeBlaBla: InforContactProps[] = [
    {
      title: "Địa chỉ",
      text: "01 Nguyễn Cửu Vân Bình Thạnh, TP.HCM",
    },
    {
      title: "Điện thoại",
      text: "08 38 40 90 92",
    },
    {
      title: "Hotline",
      text: "0968 159 239",
    },
  ];
  return (
    <div className="formContact">
      <Container>
        <Grid2 container spacing={1} size={12}>
          {storeContacts.map((eachContact, index) => (
            <EachContact {...eachContact} key={index}></EachContact>
          ))}
          <Grid2 size={3}>
            <div className="titleContact">
              VIOLET ON WEDNESDAY
              <div className="slideUnderTitleContact"></div>
            </div>
            <ul>
              {storeBlaBla.map((blabla, index) => (
                <InforContact {...blabla} key={index}></InforContact>
              ))}
            </ul>
            <Grid2 size={12} className="idea titleContactText">
              Mọi ý kiến xin vui lòng gửi về
            </Grid2>
            <div className="idea"> support@violetonwednesday.com</div>
            <Grid2 className="formLogoContact">
              <Grid2 container spacing={1} className="logoContact">
                <FacebookIcon></FacebookIcon>
                <XIcon></XIcon>
                <GoogleIcon></GoogleIcon>
                <InstagramIcon></InstagramIcon>
                <TwitterIcon></TwitterIcon>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}
