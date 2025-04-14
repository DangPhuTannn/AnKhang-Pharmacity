import { Grid2 } from "@mui/material";
import { FlowerProps } from "../../interface/interface";
import "./../../css/flower.css";
import { formatVND } from "../../function";
import { useCart } from "../User/CartContext";

export default function FlowerVertical({
  eachFlower,
  size,
}: {
  eachFlower: FlowerProps;
  size: number;
}) {
  const { name, imageURL, flowerCode, discount, price } = eachFlower;
  const { dispatch } = useCart();
  return (
    <Grid2 size={size} className="eachFlowerVertical">
      <img src={`/Lab1/Image/Advertisement/Images/${imageURL}`}></img>
      {discount != 0 && (
        <div className="discountFlowerVertical">-{discount}%</div>
      )}
      <div className="infoFlowerVertical">
        <div className="nameFlower">{name}</div>
        <div className="flowerCode">{flowerCode}</div>
        {discount != 0 && <div className="priceFlower">{formatVND(price)}</div>}
        <div className="discountPriceFlower">
          {formatVND((price * (100 - discount)) / 100)}
        </div>
      </div>
      <div
        className="text-center mt-auto font-bold py-[10px] bg-[#662D91] text-white"
        onClick={() =>
          dispatch({
            type: "ADD",
            payload: eachFlower,
          })
        }
      >
        Mua hàng
      </div>
    </Grid2>
  );
}
