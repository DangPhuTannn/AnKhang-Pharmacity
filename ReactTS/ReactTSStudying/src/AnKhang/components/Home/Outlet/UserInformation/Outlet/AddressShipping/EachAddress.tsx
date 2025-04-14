import { Dispatch, SetStateAction, useMemo } from "react";

import HomeIcon from "@mui/icons-material/Home";
import { AddressShippingProps } from "../../../../../../Config/interface";
export default function EachAddress({
  addressShipping,
  storeAddressShipping,
  setOpenDrawer,
  setChangeAddress,
  handleDeleteAddress,
}: {
  addressShipping: AddressShippingProps;
  storeAddressShipping: AddressShippingProps[];
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  setChangeAddress: Dispatch<SetStateAction<AddressShippingProps | null>>;
  handleDeleteAddress: (addressShippingId: number | undefined) => Promise<void>;
}) {
  const {
    addressShippingId,
    name,
    phone,
    province,
    district,
    ward,
    address,
    defaultAddress,
  } = useMemo(() => {
    return addressShipping;
  }, [addressShipping]);
  return (
    <div
      className={`eachMyAddress ${
        storeAddressShipping.length == 1 && "firstEachMyAddress"
      }`}
      key={addressShippingId}
    >
      <div className="flex flex-col gap-[10px] w-[90%] break-words">
        <div className="flex gap-[10px] items-center">
          <div className="text-[14px] font-bold">{name}</div>
          <div className="w-[0.5px] h-[20px] bg-[#4a4f63]"></div>
          <div className="text-[13px] text-[#4a4f63]">{phone}</div>
        </div>
        <div className="text-[14px] text-[#4a4f63] tracking-[0.03rem]">
          {`${address}, ${ward}, ${district}, ${province}`}
        </div>
        <div className="flex gap-[10px]">
          <div className="rounded-3xl bg-[#4cb551] text-[white] text-[12px] items-center flex gap-[2px] w-fit px-[8px] py-[4px]">
            <HomeIcon className="scale-80" />
            Nhà
          </div>
          {defaultAddress && (
            <div className="flex rounded-3xl bg-[#4cb551] text-[white] text-[12px] items-center w-fit px-[8px] py-[4px]">
              Mặc định
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-[10px] items-center">
        <div
          className="text-[14px] text-[#4cb551] cursor-pointer"
          onClick={() => {
            setOpenDrawer(true);
            setChangeAddress({
              addressShippingId,
              name,
              phone,
              province,
              district,
              ward,
              address,
              defaultAddress,
            });
          }}
        >
          Sửa
        </div>
        <div className="w-[0.5px] h-[20px] bg-[#4a4f63]"></div>
        <div
          className="text-[#d92d20] text-[14px] cursor-pointer"
          onClick={() => handleDeleteAddress(addressShippingId)}
        >
          Xóa
        </div>
      </div>
    </div>
  );
}
