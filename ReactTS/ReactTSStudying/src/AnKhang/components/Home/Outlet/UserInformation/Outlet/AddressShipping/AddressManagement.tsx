import "./../../../../../../css/Home/Outlet/Address/myAddress.css";
import { useEffect, useState } from "react";

import EachAddress from "./EachAddress";
import FormAddress from "./FormAddress";
import useAxios from "../../../../../../Config/axiosInstance";
import { AddressShippingProps, AddressValuesProps } from "../../../../../../Config/interface";
import { useAuth } from "../../../../../../GlobalUtils/AuthContext";
import { useBackdrop } from "../../../../../../GlobalUtils/BackdropGlobal";
export default function AddressManagement() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { user } = useAuth();
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const [storeAddressShipping, setStoreAddressShipping] = useState<
    AddressShippingProps[]
  >([]);
  const [changeAddress, setChangeAddress] =
    useState<AddressShippingProps | null>(null);

  const axiosInstance = useAxios();
  useEffect(() => {
    async function getAddressShipping() {
      try {
        showBackdrop();
        const response = await axiosInstance.get(
          `/myAddress/getAllAddresses/${user?.email}`
        );
        if (response.data.code == 1000) {
          setStoreAddressShipping(response.data.result);
        }
      } catch (error) {
        console.error("Error getting address", error);
      } finally {
        hideBackdrop();
      }
    }
    getAddressShipping();
  }, []);

  const handleAddAddress = async (data: AddressValuesProps) => {
    try {
      showBackdrop();
      const response = await axiosInstance.post("/myAddress/addingAddress", {
        clientEmail: user?.email,
        name: data.fullName,
        phone: data.phone,
        province: data.province,
        district: data.district,
        ward: data.ward,
        address: data.address,
        defaultAddress: data.isDefault,
      });
      if (response.data.code == 1000) {
        setStoreAddressShipping(response.data.result);
      }
    } catch (error) {
      console.error("Error adding address", error);
    } finally {
      hideBackdrop();
    }
  };

  const handleChangeAddress = async (
    data: AddressValuesProps,
    addressShippingId: number
  ) => {
    try {
      showBackdrop();
      const response = await axiosInstance.put("/myAddress/changingAddress", {
        clientEmail: user?.email,
        addressShippingId,
        name: data.fullName,
        phone: data.phone,
        province: data.province,
        district: data.district,
        ward: data.ward,
        address: data.address,
        defaultAddress: data.isDefault,
      });
      if (response.data.code == 1000) {
        setStoreAddressShipping(response.data.result);
        setChangeAddress(null);
      }
    } catch (error) {
      console.error("Error adding address", error);
    } finally {
      hideBackdrop();
    }
  };

  const handleDeleteAddress = async (addressShippingId: number | undefined) => {
    try {
      showBackdrop();
      const response = await axiosInstance.delete("/myAddress/deleteAddress", {
        data: {
          clientEmail: user?.email,
          addressShippingId,
        },
      });
      if (response.data.code == 1000) {
        setStoreAddressShipping(response.data.result);
      }
    } catch (error) {
      console.error("Error adding address", error);
    } finally {
      hideBackdrop();
    }
  };

  return (
    <>
      <FormAddress
        open={openDrawer}
        setOpen={setOpenDrawer}
        handleAddAddress={handleAddAddress}
        changeAddress={changeAddress}
        setChangeAddress={setChangeAddress}
        handleChangeAddress={handleChangeAddress}
        handleDeleteAddress={handleDeleteAddress}
      />
      <div className="flex flex-col gap-[1.25rem]">
        <div className="flex justify-between items-center">
          <div className="font-bold text-[18px]">Quản lý sổ địa chỉ</div>
          <div
            onClick={() => setOpenDrawer(true)}
            className="text-white bg-[#4cb551] text-[14px] font-bold py-[12px] px-[30px] rounded-3xl cursor-pointer"
          >
            Thêm địa chỉ mới
          </div>
        </div>
        <div className="storeAllAddresses">
          {storeAddressShipping.map((eachAddressShipping, index) => (
            <EachAddress
              addressShipping={eachAddressShipping}
              storeAddressShipping={storeAddressShipping}
              handleDeleteAddress={handleDeleteAddress}
              setOpenDrawer={setOpenDrawer}
              setChangeAddress={setChangeAddress}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
