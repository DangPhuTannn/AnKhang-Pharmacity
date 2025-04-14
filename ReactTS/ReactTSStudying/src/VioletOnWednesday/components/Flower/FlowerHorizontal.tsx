import { Grid2 } from "@mui/material";
import { FlowerProps } from "../../interface/interface";
import { formatVND } from "../../function";
export default function FlowerHorizontal(eachFlower: FlowerProps) {
  const { name, imageURL, price, discount } = eachFlower;
  return (
    <>
      <Grid2 container spacing={2} size={12} className="eachFlowerHorizontal">
        <img src={`/Lab1/Image/Advertisement/Images/${imageURL}`}></img>
        <Grid2 size={7.8}>
          <div className="nameFlowerHorizontal"> {name}</div>
          <div className="storePriceFlowerHorizontal">
            {discount != 0 && (
              <div className="priceFlower">{formatVND(price)}</div>
            )}
            <div className="discountPriceFlowerHorizontal">
              {formatVND((price * (100 - discount)) / 100)}
            </div>
          </div>
          {discount != 0 && (
            <div className="discountFlowerHorizontal">-{discount}%</div>
          )}
        </Grid2>
      </Grid2>
      <div className="dashdash"></div>
    </>
  );
}
