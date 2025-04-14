import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";

function getEncodeEndpoint(getURL: string) {
  switch (getURL) {
    case "myProfile":
      return "Thông tin cá nhân";
    case "myOrder":
      return "Đơn hàng của tôi";
    case "myAddress":
      return "Quản lý sổ địa chỉ";
    case "myVaccination":
      return "Lịch hẹn tiêm chủng";
    case "myMedicines":
      return "Đơn thuốc của tôi";
  }
}

export default function BreadcumsUserInformation() {
  const location = useLocation();
  const endPoint = location.pathname.split("/")[3];


  return (
    <div role="presentation" className="storeBreadcrumsCategoryHome">
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/home" className="eachBreadCrumsCategoryHome">
          Trang chủ
        </Link>
        <Link
          href="/home/myInfor/myProfile"
          className="eachBreadCrumsCategoryHome"
        >
          Cá nhân
        </Link>
        <Typography sx={{ color: "text.primary", fontSize: 14 }}>
          {getEncodeEndpoint(endPoint)}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
