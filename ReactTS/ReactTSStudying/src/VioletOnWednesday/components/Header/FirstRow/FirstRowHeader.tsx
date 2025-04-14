import { Container, Grid2 } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useUser } from "../../User/UserContext";
import { Link, useNavigate } from "react-router-dom";
function FirstRowHeader() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const isAdmin = user?.permissions.find(
    (eachPermission) => eachPermission == "admin"
  );
  return (
    <Container>
      <Grid2 size={12} container spacing={2}>
        <Grid2 size={3.5} className="eachItem">
          <LocalPhoneIcon className="iconFirstRowPhone"></LocalPhoneIcon>
          Hotline:{" "}
          <span className="boldTextFirstRow">0968 159 239 - 08.38 409 092</span>
        </Grid2>
        <Grid2 size={5.5} className="eachItem">
          <LocationOnIcon className="iconFirstRowLocation"></LocationOnIcon>
          Địa chỉ:{" "}
          <span className="boldTextFirstRow">
            01 Nguyễn Cửu Văn, Bình Thạnh, TP.HCM
          </span>
        </Grid2>
        <Grid2 size={3} className="eachItem">
          {user ? (
            <div>
              <div className="flex gap-[10px]">
                <div>
                  Username :{" "}
                  <span className="boldTextFirstRow">{user.username}</span>
                </div>
                {isAdmin && <Link to="/admin">Go to DashBoard</Link>}
                <div
                  onClick={() => {
                    setUser(null);
                    navigate("");
                  }}
                  className="cursor-pointer"
                >
                  Log out
                </div>
              </div>
            </div>
          ) : (
            <>
              <span className="boldTextFirstRow">
                <Link to="/">Đăng nhập</Link>
              </span>{" "}
              hoặc <span className="boldTextFirstRow">Tạo tài khoản mới</span>
            </>
          )}
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default FirstRowHeader;
