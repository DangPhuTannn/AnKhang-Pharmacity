import { Grid2 } from "@mui/material";
import { roundNumber } from "../../../../../Config/function";
import { MedicineProps } from "../../../../../Config/interface";
import { useCart } from "../../Cart/CartContext";
import { Link } from "react-router-dom";

export default function Medicine({
  medicineData,
  sizeEachMedicine,
}: {
  medicineData: MedicineProps;
  sizeEachMedicine: number;
}) {
  const {
    medicineName,
    price,
    packageUnit,
    packageQuantity,
    itemUnit,
    itemQuantityPerPackage,
    discount,
    imageURL,
    medicineId,
    totalQuantity,
    deleted,
  } = medicineData;
  const { addMedicineToCart } = useCart();
  return (
    <>
      <Grid2 size={sizeEachMedicine} className="medicineContainer">
        <div className="medicine">
          <Link
            to={`/home/product/${encodeURIComponent(medicineName)}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <img src={`/AnKhang/Medicines/${imageURL}`}></img>
            {discount != 0 && (
              <div className="discountMedicine">-{discount}%</div>
            )}

            <div className="quantityMedicine">
              {`${packageQuantity} ${packageUnit} x ${itemQuantityPerPackage} ${itemUnit}`}
            </div>
            <div className="nameMedicine multiline-ellipsis-MedicineName">
              {medicineName}
            </div>
            <div className="priceMedicine">
              <div className="storePriceAndTypeMedicine">
                <div className="priceDiscount">
                  {roundNumber(
                    (price * (100 - discount)) / 100,
                    0
                  ).toLocaleString("vi-VN") + "đ"}
                </div>
                <div className="typePriceDiscount">/{packageUnit}</div>
              </div>
            </div>
            {discount != 0 && (
              <div className="realPriceMedicine">
                {roundNumber(price).toLocaleString("vi-VN") + "đ"}
              </div>
            )}
          </Link>
          <div>
            {totalQuantity > 0 && !deleted ? (
              <div
                className="addCartButtonMedicine cartButtonMedicine"
                onClick={() => addMedicineToCart(medicineId, 1)}
              >
                Thêm vào giỏ hàng
              </div>
            ) : (
              <>
                <div className="mb-[10px] text-[#1f4eaf] text-[14px]">
                  Tạm hết hàng
                </div>
                <Link
                  to={`/home/product/${encodeURIComponent(medicineName)}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="soldOutCartButtonMedicine cartButtonMedicine">
                    Xem chi tiết
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </Grid2>
    </>
  );
}
