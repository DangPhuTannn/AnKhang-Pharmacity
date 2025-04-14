import { roundNumber } from "../../../../../../Config/function";
import { OrderItemProps } from "../../../../../../Config/interface";

export default function EachOrderItem({
  finalPrice,
  imageURL,
  medicineName,
  orderItemId,
  packageUnit,
  quantity,
  discountFromMedicine,
  totalPrice,
}: OrderItemProps) {
  return (
    <div
      className="flex gap-4 py-4 border-b border-gray-300 items-center"
      key={orderItemId}
    >
      <div className="w-[55%] max-w-[55%] flex gap-4">
        <div className="w-[60px] h-[60px] p-1.5 rounded-lg border border-gray-300 flex-shrink-0">
          <img
            src={`/AnKhang/Medicines/${imageURL}`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-gray-800 text-sm leading-tight">
          {medicineName}
        </div>
      </div>
      <div className="w-[10%] text-center text-gray-700">{quantity}</div>
      <div className="w-[15%] text-center text-gray-700 text-sm">
        {packageUnit}
      </div>
      <div className="w-[20%] text-center text-sm text-green-600 font-bold">
        {roundNumber(finalPrice).toLocaleString("vi-VN") + "đ"}
        {discountFromMedicine !== 0 && (
          <div className="text-xs line-through text-gray-500">
            {roundNumber(totalPrice).toLocaleString("vi-VN") + "đ"}
          </div>
        )}
      </div>
    </div>
  );
}
