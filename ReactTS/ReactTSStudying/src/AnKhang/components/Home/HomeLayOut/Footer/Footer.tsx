import { Box, Container, Grid2 } from "@mui/material";
import "./../../../../css/Home/footer.css";
import { FormContact } from "./FormContact";
import SocialFooter from "./SocialFooter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { contactData, storeFooterLogosWB } from "../../../../Config/glovalVariables";
import { SocialFooterProps } from "../../../../Config/interface";
const storeSocialFooter: SocialFooterProps[] = [
  {
    title: "KẾT NỐI VỚI CHÚNG TÔI",
    storeIcons: [
      <FacebookIcon className="socialIconFooter" />,
      <YouTubeIcon className="socialIconFooter" />,
      <InstagramIcon className="socialIconFooter" />,
    ],
    size: 2,
  },
  {
    title: "CHỨNG NHẬN BỞI",
    storeIcons: ["socialIMG3.png", "socialIMG4.png", "socialIMG5.png"],
    size: 4,
  },
];
function Footer() {
  return (
    <Grid2 className="footer" size={12} container>
      <Container>
        <Grid2 container spacing={2} className="storeFormContact">
          {contactData.map(({ title, storeText, sizeContact }, index) => (
            <FormContact
              title={title}
              storeText={storeText}
              sizeContact={sizeContact}
              key={index}
            ></FormContact>
          ))}
        </Grid2>
        <Grid2 className="footerSocial" size={12} spacing={2} container>
          {storeSocialFooter.map(({ title, storeIcons, size }, index) => (
            <SocialFooter
              title={title}
              storeIcons={storeIcons}
              size={size}
              key={index}
            ></SocialFooter>
          ))}
        </Grid2>
        <div className="footerTemp">
          Công Ty Cổ Phần Dược Phẩm An Khang Pharma. GPDKKD: 0314587300 do sở KH
          & ĐT TP.HCM cấp ngày 21/08/2017. Trụ sở chính: 128, Trần Quang Khải,
          P.Tân Định, Quận.1, TP.HCM. Giấy phép thiết lập trang thông tin điện
          tử tổng hợp số 03/GP-STTTT ngày 21/02/2023 cấp bởi Sở Thông Tin và
          Truyền Thông TP.HCM. Địa chỉ liên hệ và gửi chứng từ: Lô T2-1.2, Đường
          D1, Đ. D1, P.Tân Phú, TP.Thủ Đức, TP.Hồ Chí Minh. Email:
          cskh@nhathuocankhang.com. Chịu trách nhiệm nội dung: Huỳnh Văn Tốt.
          hotrotmdt@thegioididong.com.
        </div>
      </Container>
      <Box className="footerLogoWB">
        <p>Ghé thăm các website khác cùng tập đoàn MWG</p>
        <Grid2
          spacing={1}
          size={12}
          container
          justifyContent="center"
          alignItems="center"
          paddingTop={2}
        >
          {storeFooterLogosWB.map((eachLogo, index) => (
            <Grid2 key={index}>
              <img src={eachLogo}></img>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Grid2>
  );
}

export default Footer;
