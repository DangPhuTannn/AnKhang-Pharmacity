import { useCallback } from "react";

import EachOrderItem from "./EachOrderItem";
import {
  getStatusStyle,
  getStatusName,
  mappingToOrderAddress,
} from "../../../../../../Config/function";
import { OrderProps } from "../../../../../../Config/interface";
import { useOrder } from "./OrderManagement";
import { showConfirmDialog } from "../../../../../../Config/functionTSX";

export default function EachOrder({ order }: { order: OrderProps }) {
  const { setPickedAddressOrder, setOpenAnchor, handleDeleteOrder } =
    useOrder();
  const getUpdateAddress = useCallback((order: OrderProps) => {
    setPickedAddressOrder(mappingToOrderAddress(order));
    setOpenAnchor(true);
  }, []);
  return (
    <div className="bg-white p-[10px] mt-[10px]">
      <div className="font-bold">Mã đơn hàng : {order.orderId}</div>
      <div className="max-h-[278px] overflow-y-auto eachOrderForm">
        {order.orderItems.map((eachOrderItem) => (
          <EachOrderItem {...eachOrderItem} key={eachOrderItem.orderItemId} />
        ))}
      </div>
      <div className="flex py-[16px] gap-[20px]">
        <div className="px-[6px] w-[60%] flex flex-col gap-[10px]">
          <div className="flex justify-between items-center">
            <div
              className={`w-fit px-[20px] py-[5px] ${getStatusStyle(
                order.orderStatus
              )}`}
            >
              {getStatusName(order.orderStatus)}
            </div>
            {order.orderStatus == "PROCESSING" && (
              <div
                className="text-[13px] text-[#d92d20] cursor-pointer"
                onClick={() => getUpdateAddress(order)}
              >
                Thay đổi địa chỉ
              </div>
            )}
          </div>
          <div className="flex gap-[10px]">
            <div className="font-bold flex-shrink-0">Địa chỉ :</div>
            <div className="text-[#657384] break-all">
              {`${order.address}, ${order.ward}, ${order.district}, ${order.province}`}
            </div>
          </div>
          <div className="flex gap-[10px]">
            <div className="font-bold flex-shrink-0">Người nhận :</div>
            <div className="text-[#4cb551] font-bold break-all">
              {order.name}
            </div>
            <div className="font-bold flex-shrink-0">Số điện thoại :</div>
            <div className="text-[#657384] break-all">{order.phone}</div>
          </div>
          <div className="flex gap-[10px]">
            <div className="font-bold flex-shrink-0">Ghi chú :</div>
            <div className="text-[#657384] break-all">{order.note}</div>
          </div>
        </div>
        <div className="w-full max-w-[40%] flex flex-col gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="flex justify-between">
            <div className="text-gray-600">Ngày đặt hàng</div>
            <div className="text-gray-800 font-semibold">{order.orderDate}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-gray-600">Tiết kiệm được</div>
            <div className="text-orange-500 font-semibold">
              -{order.totalDiscount.toLocaleString("vi-VN") + "đ"}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-gray-600">Điểm tích lũy</div>
            <div className="text-orange-500 font-semibold">
              {order.loyaltyPointsEarned}
            </div>
          </div>
          <div className="flex justify-between items-center border-t pt-3 mt-3">
            <div className="text-lg font-bold text-gray-800">Thành tiền</div>
            <div className="flex flex-col items-end">
              {order.totalDiscount !== 0 && (
                <div className="text-gray-500 line-through text-sm">
                  {order.totalPrice.toLocaleString("vi-VN") + "đ"}
                </div>
              )}
              <div className="text-green-600 text-xl font-bold">
                {order.finalPrice.toLocaleString("vi-VN") + "đ"}
              </div>
            </div>
          </div>
          {order.orderStatus == "PROCESSING" && (
            <div className="flex justify-end">
              <div
                className="px-[24px] py-[5px] text-center bg-red-100 text-red-700 cursor-pointer"
                onClick={() => {
                  showConfirmDialog({
                    message: (
                      <div style={{ whiteSpace: "pre-line" }}>
                        Are you sure you want to cancel this order?
                      </div>
                    ),
                    accept: () => handleDeleteOrder(order.orderId),
                  });
                }}
              >
                Hủy đơn?
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
