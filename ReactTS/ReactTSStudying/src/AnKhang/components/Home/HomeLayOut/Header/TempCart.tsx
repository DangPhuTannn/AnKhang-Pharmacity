import "./../../../../css/Home/Outlet/Cart/tempCart.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { Link } from "react-router-dom";
import { useCart } from "../../Outlet/Cart/CartContext";
import { roundNumber } from "../../../../Config/function";
import { CartItemProps } from "../../../../Config/interface";
import { showConfirmDialog } from "../../../../Config/functionTSX";

export default function TempCart() {
  const { cart, deleteCartItemToCart } = useCart();
  return (
    <div className="tempCartContainer">
      <div className="mainTempCart">
        {cart.length > 0 ? (
          <>
            <div className="titleTempCart">Giỏ hàng</div>
            <div className="storeEachCartItemTempCart">
              {cart.map(
                ({
                  cartItemId,
                  imageURL,
                  medicineName,
                  packageUnit,
                  quantity,
                  totalPrice,
                  discountFromMedicine,
                  finalPrice,
                }: CartItemProps) => (
                  <div className="eachCartItemTempCart" key={cartItemId}>
                    <Link
                      to={`/home/product/${encodeURIComponent(medicineName)}`}
                    >
                      <div className="imgEachCartItemTempCart">
                        <img src={`/AnKhang/Medicines/${imageURL}`}></img>
                      </div>
                    </Link>

                    <div className="bodyEachCartItemTempCart">
                      <Link
                        to={`/home/product/${encodeURIComponent(medicineName)}`}
                      >
                        <div className="nameEachCartItemTempCart">
                          {medicineName}
                        </div>
                      </Link>

                      <div className="priceAndPackageEachCartItemTempCart">
                        <div className="priceEachCartItemTempCart">
                          <div className="discountPriceEachCartItemTempCart">
                            {roundNumber(finalPrice).toLocaleString("vi-VN") +
                              "đ"}
                          </div>
                          {discountFromMedicine != 0 && (
                            <div className="realPriceEachCartItemTempCart">
                              {roundNumber(totalPrice).toLocaleString("vi-VN") +
                                "đ"}
                            </div>
                          )}
                        </div>
                        <div className="packageEachCartItemTempCart">{`x${quantity} ${packageUnit}`}</div>
                      </div>
                    </div>
                    <div className="storeBinEachCartItemTempCart">
                      <DeleteForeverIcon
                        className="binEachCartItemTempCart"
                        onClick={() =>
                          showConfirmDialog({
                            message: (
                              <div style={{ whiteSpace: "pre-line" }}>
                                Are you sure you want to delete?
                              </div>
                            ),
                            accept: () => deleteCartItemToCart(cartItemId),
                          })
                        }
                      />
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="footerCartItemTempCart">
              <div className="totalQuantityFooterCartItemTempCart">
                {cart.length} sản phẩm
              </div>
              <Link to="/home/cart/myCart">
                <div className="buttonShowCartFooterCartItemTempCart">
                  Xem giỏ hàng
                </div>
              </Link>
            </div>
          </>
        ) : (
          <div className="noProductTempCart">
            Hiện tại không có sản phẩm nào. <br />
            Bạn hãy mua sản phẩm nhé!!!
          </div>
        )}
      </div>
    </div>
  );
}
