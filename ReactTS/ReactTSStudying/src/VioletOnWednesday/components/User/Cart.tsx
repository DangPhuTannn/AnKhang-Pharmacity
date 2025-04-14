import { useEffect, useState } from "react";
import { FlowerProps } from "../../interface/interface";
import { useCart } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const styles = {
  container: "border border-gray-400 px-10 py-20",
  eachShoppingCart:
    "flex gap-10 p-[10px] border border-gray-400 mt-[10px] items-center",
  button: "py-[5px] px-[10px] bg-black w-fit cursor-pointer text-white",
};
export default function Cart() {
  const [flowers, setFlowers] = useState<FlowerProps[]>([]);
  const { cart, dispatch } = useCart();
  useEffect(() => {
    async function getFlowers() {
      const response = await axios.get("http://localhost:3001/flowers");
      if (response.data.length > 0) {
        setFlowers(response.data);
      }
    }
    getFlowers();
  }, []);
  const handleAdd = (flower: FlowerProps) => {
    dispatch({
      type: "ADD",
      payload: flower,
    });
  };
  const handleRemove = (id: string) => {
    dispatch({
      type: "REMOVE",
      payload: {
        id,
      },
    });
  };
  const handleIncrease = (id: string) => {
    dispatch({
      type: "INCREASE",
      payload: {
        id,
      },
    });
  };
  const handleDecrease = (id: string) => {
    dispatch({
      type: "DECREASE",
      payload: {
        id,
      },
    });
  };
  const handleClear = () => {
    dispatch({
      type: "CLEAR",
    });
  };
  const navigate = useNavigate();
  return (
    <div className="m-[10px]">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <div className={styles.container}>
        <div className="text-[25px] font-bold">Products </div>
        <ul>
          {flowers.map((eachFlower, index) => (
            <li className={styles.eachShoppingCart} key={index}>
              {`${eachFlower.name} - ${
                eachFlower.price.toLocaleString("vi-VN") + "đ"
              }`}
              <div
                className={styles.button}
                onClick={() => handleAdd(eachFlower)}
              >
                Add to Cart
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.container} mt-[20px]`}>
        <div className="title">Shopping Cart</div>
        <ul>
          {cart.map(({ flower, quantity }, index) => (
            <li className={styles.eachShoppingCart} key={index}>
              {`${flower.name} - ${flower.price.toLocaleString(
                "vi-VN"
              )} x ${quantity}`}
              <div
                className={styles.button}
                onClick={() => handleRemove(flower.id)}
              >
                Remove
              </div>
              <div
                className={styles.button}
                onClick={() => handleIncrease(flower.id)}
              >
                +
              </div>
              <div
                className={styles.button}
                onClick={() => handleDecrease(flower.id)}
              >
                -
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-[10px]">
          {`Total: ${
            cart.length > 0
              ? cart
                  .reduce(
                    (total, item) =>
                      total +
                      ((item.flower.price * (100 - item.flower.discount)) /
                        100) *
                        item.quantity,
                    0
                  )
                  .toLocaleString("vi-VN") + "đ"
              : "0đ"
          }`}
        </div>
        <div className="flex gap-[1.25rem]">
          <div
            className={`${styles.button} mt-[10px]`}
            onClick={() => handleClear()}
          >
            Clear Cart
          </div>

          <div
            className={`${styles.button} mt-[10px]`}
            onClick={() => {
              if (cart.length < 1) {
                toast.error("Hãy chọn sản phẩm trước khi đặt hàng");
                return;
              }
              navigate("/shipping");
            }}
          >
            Order
          </div>
        </div>
      </div>
    </div>
  );
}
