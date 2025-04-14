import { useCallback, useEffect, useState } from "react";
import "./../../../../../../css/Home/Outlet/Order/formOrderStatus.css";
import { storeOrderStatus } from "../../../../../../Config/glovalVariables";
import { useOrder } from "./OrderManagement";
import EachOrder from "./EachOrder";
import FormChangeAddressOrder from "./FormChangeAddressOrder";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
export default function OrderBody() {
  const [choseStatusIndex, setChoseStatusIndex] = useState(0);
  const { setFilters, orderList } = useOrder();
  const handleChooseStatus = useCallback((index: number) => {
    setChoseStatusIndex(index);
    setFilters((prev) => ({
      ...prev,
      listStatus: storeOrderStatus[index].status,
    }));
  }, []);
  const [showMore, setShowMore] = useState(Math.min(5, orderList.length));
  useEffect(() => {
    setShowMore(Math.min(5, orderList.length));
  }, [orderList]);
  return (
    <>
      <div className="bg-white flex rounded-t-2xl text-center text-[#657384]">
        {storeOrderStatus.map((each, index) => (
          <div
            className={`w-[20%] py-[10px] cursor-pointer ${
              choseStatusIndex == index && "choseStatusIndex"
            }`}
            key={index}
            onClick={() => handleChooseStatus(index)}
          >
            {each.title}
          </div>
        ))}
      </div>
      <div className="mt-[1px]">
        <div className="w-full">
          <div className="bg-white p-[10px]">
            <div className="flex items-center text-center font-bold gap-[5px] ">
              <div className="w-[55%]">Sản phẩm</div>
              <div className="w-[10%]">Số lượng</div>
              <div className="w-[15%]">Đơn vị</div>
              <div className="w-[20%]">Tiền</div>
            </div>
          </div>
          <FormChangeAddressOrder />
          {orderList
            .slice(0, Math.min(showMore, orderList.length))
            .map((eachOrder) => (
              <EachOrder order={eachOrder} key={eachOrder.orderId} />
            ))}

          {showMore < orderList.length && (
            <div
              className="flex justify-center items-center p-3 cursor-pointer"
              onClick={() => setShowMore((prevTotal) => prevTotal + 5)}
            >
              <KeyboardDoubleArrowDownIcon className="iconStyleDisplayMedicinesRightBodyCategoryHome" />
              Xem thêm
            </div>
          )}
        </div>
      </div>
    </>
  );
}
