import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import { useCallback } from "react";
import OrderBody from "./OrderBody";
import { useOrder } from "./OrderManagement";
export default function OrderForm() {
  const { setFilters } = useOrder();
  const handleSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const getValue = e.target.value.trim();
      setFilters((prev) => ({ ...prev, searchValue: getValue }));
    }, 500),
    []
  );
  return (
    <div className="flex flex-col gap-[1.25rem]">
      <div className="flex justify-between items-center">
        <div className="text-[18px] w-[30%] font-bold">Đơn hàng của tôi</div>
        <div className="w-[65%] bg-[#d9dfe5] py-[10px] px-[16px] rounded-3xl relative">
          <input
            type="text"
            className="w-full outline-0"
            placeholder="Tìm theo tên đơn, mã đơn hoặc tên sản phẩm"
            onChange={(e) => handleSearch(e)}
          ></input>
          <div className="absolute right-[5px] top-[5px] w-fit h-fit p-[4px] bg-[#4cb551] rounded-full text-white">
            <SearchIcon className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div>
        <OrderBody />
      </div>
    </div>
  );
}
