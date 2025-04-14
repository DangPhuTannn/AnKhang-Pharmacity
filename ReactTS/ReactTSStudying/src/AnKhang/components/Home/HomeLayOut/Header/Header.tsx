import { Grid2 } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./../../../../css/Home/header.css";
import EachContent from "./EachContent";
import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { storeContents } from "../../../../Config/glovalVariables";
import UserOptionsHeader from "./UserOptionsHeader";
import SearchResult from "./SearchResult";
import { useCart } from "../../Outlet/Cart/CartContext";
import { useAuth } from "../../../../GlobalUtils/AuthContext";
import TempCart from "./TempCart";

function Header() {
  const { cart, isShowTempCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isCartPage = useMemo(() => {
    return location.pathname == "/home/cart/myCart";
  }, [location]);

  return (
    <>
      <div className="headerContainer">
        <div className=" storeHeaderImage">
          <img
            src="/logoAnKhang.png"
            alt="logo AnKhang"
            className="logoAnKhangImage"
            onClick={() => navigate("/home")}
          />
        </div>

        <SearchResult />
        <div className="storeUserOptionsHeader">
          <Link to="/home/myInfor/myProfile">
            <div className="itemHeader">
              <PersonIcon className="iconHeader"></PersonIcon>
              <span className="storeUserEmailHeader">{user?.email}</span>
            </div>
          </Link>

          <UserOptionsHeader />
        </div>

        <div
          className={`itemHeader cartHeader ${
            isShowTempCart && "isShowTempCart"
          }`}
        >
          <Link to="/home/cart/myCart" className="flex gap-[10px]">
            <div className="cartHeader">
              <ShoppingCartIcon className="iconHeader"></ShoppingCartIcon>
              {cart.length > 0 && (
                <div className="storeTotalProducts">{cart.length}</div>
              )}
            </div>
            Giỏ Hàng
          </Link>
          {!isCartPage && <TempCart />}
        </div>
      </div>
      <Grid2 padding={1} container marginTop={2}>
        {storeContents.map((eachContent, index) => (
          <EachContent {...eachContent} key={index}></EachContent>
        ))}
      </Grid2>
    </>
  );
}

export default Header;
