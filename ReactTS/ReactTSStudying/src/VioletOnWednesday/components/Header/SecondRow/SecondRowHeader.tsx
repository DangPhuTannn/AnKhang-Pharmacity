import { Container, Grid2 } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../User/CartContext";
function SecondRowHeader() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    navigate(`/products/${searchValue}`);
    setSearchValue("");
  };
  const { cart } = useCart();
  return (
    <Container className="secondRowHeader">
      <Grid2 size={12} container spacing={2}>
        <Grid2 size={7} className="logoSecondRow">
          <img
            src="/Lab1/Image/Header/logoViolet.png"
            alt="logo"
            loading="lazy"
          ></img>
        </Grid2>
        <Grid2 size={2.3}>
          <div className="storeInputSecondRow">
            <input
              className="inputSecondRow"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSearch();
                }
              }}
              type="text"
              placeholder="Tìm kiếm..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
            <SearchIcon
              className="iconSecondRow cursor-pointer"
              onClick={() => handleSearch()}
            ></SearchIcon>
          </div>
        </Grid2>
        <Grid2 size={2.7} container>
          <Grid2 size={2}>
            <div className="storeIconCart" onClick={() => navigate("/cart")}>
              <ShoppingCartIcon className="iconCart"></ShoppingCartIcon>
            </div>
          </Grid2>
          <Grid2 size={10}>
            <div className="storeTotal">
              <div className="totalProducts">{cart.length} sản phẩm</div>
              <div className="totalPrice">
                {cart
                  .reduce(
                    (total, item) =>
                      total +
                      ((item.flower.price * (100 - item.flower.discount)) /
                        100) *
                        item.quantity,
                    0
                  )
                  .toLocaleString("vi-VN") + "đ"}
              </div>
            </div>
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default SecondRowHeader;
