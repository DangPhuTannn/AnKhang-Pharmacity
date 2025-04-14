/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import axios from "axios";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import {
  AddressOrderValues,
  ProvinceProps,
  DistrictProps,
  WardsProps,
} from "../../../../../../Config/interface";
import { useOrder } from "./OrderManagement";
import { mappingToOrderAddress } from "../../../../../../Config/function";

const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return Object.values(response.data);
};

export default function FormChangeAddressOrder() {
  const { handleUpdateAddress, pickedAddressOrder, openAnchor, setOpenAnchor } =
    useOrder();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<AddressOrderValues>({
    defaultValues: {
      province: "",
      district: "",
      ward: "",
      name: "",
      phone: "",
      address: "",
      note: "",
    },
  });

  const [storeProvinces, setStoreProvinces] = useState<ProvinceProps[]>([]);
  const [storeDistricts, setStoreDistricts] = useState<DistrictProps[]>([]);
  const [storeWards, setStoreWards] = useState<WardsProps[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<DistrictProps[]>(
    []
  );
  const [filteredWards, setFilteredWards] = useState<WardsProps[]>([]);
  const selectedProvince = watch("province");
  const selectedDistrict = watch("district");
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [provinces, districts, wards] = await Promise.all([
          fetchData(`${import.meta.env.BASE_URL}AnKhang/tinh_tp.json`),
          fetchData(`${import.meta.env.BASE_URL}AnKhang/quan_huyen.json`),
          fetchData(`${import.meta.env.BASE_URL}AnKhang/xa_phuong.json`),
        ]);

        setStoreProvinces(
          provinces.map((eachProvince: any) => ({
            code: eachProvince.code,
            name: eachProvince.name,
            nameWithType: eachProvince.name_with_type,
          }))
        );

        setStoreDistricts(
          districts.map((eachDistrict: any) => ({
            code: eachDistrict.code,
            name: eachDistrict.name,
            nameWithType: eachDistrict.name_with_type,
            parentCode: eachDistrict.parent_code,
          }))
        );

        setStoreWards(
          wards.map((eachWard: any) => ({
            code: eachWard.code,
            name: eachWard.name,
            nameWithType: eachWard.name_with_type,
            parentCode: eachWard.parent_code,
          }))
        );
      } catch (error) {
        console.error("Error fetching JSON:", error);
      }
    };

    fetchAllData();
  }, []);
  useEffect(() => {
    if (pickedAddressOrder) {
      setValue("name", pickedAddressOrder.name);
      setValue("phone", pickedAddressOrder.phone);
      setValue("province", pickedAddressOrder.province);
      setValue("district", pickedAddressOrder.district);
      setValue("ward", pickedAddressOrder.ward);
      setValue("address", pickedAddressOrder.address);
      setValue("note", pickedAddressOrder.note);
      const province = storeProvinces.find(
        (province) => province.nameWithType === pickedAddressOrder.province
      );
      if (province) {
        setFilteredDistricts(
          storeDistricts.filter(
            (district) => district.parentCode === province.code
          )
        );
      }

      const district = storeDistricts.find(
        (district) => district.nameWithType === pickedAddressOrder.district
      );
      if (district) {
        setFilteredWards(
          storeWards.filter((ward) => ward.parentCode === district.code)
        );
      }
    }
  }, [pickedAddressOrder]);

  const onSubmit: SubmitHandler<AddressOrderValues> = (data) => {
    if (pickedAddressOrder) {
      handleUpdateAddress(
        mappingToOrderAddress({ orderId: pickedAddressOrder.orderId, ...data })
      );
    }
  };

  const handleProvinceChange = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    const province = storeProvinces.find(
      ({ nameWithType }) => nameWithType === selectedName
    );
    if (province) {
      setFilteredDistricts(
        storeDistricts.filter(({ parentCode }) => parentCode === province.code)
      );

      setValue("province", selectedName);
      setValue("district", "");
      setValue("ward", "");
    }
  };

  const handleDistrictChange = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    const district = storeDistricts.find(
      ({ nameWithType }) => nameWithType === selectedName
    );
    if (district) {
      setFilteredWards(
        storeWards.filter(({ parentCode }) => parentCode === district.code)
      );
      setValue("district", selectedName);
      setValue("ward", "");
    }
  };

  const handleWardChange = (event: SelectChangeEvent) => {
    setValue("ward", event.target.value);
  };

  const detail = () => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      className="max-h-screen overflow-hidden"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="p-[16px] flex justify-between">
          <div className="font-bold">Thay đổi địa chỉ</div>
          <div
            className="scale-80 cursor-pointer"
            onClick={() => setOpenAnchor(false)}
          >
            <CloseIcon />
          </div>
        </div>
        <div className="bg-[#EDF0F3] p-[16px] pb-[0px] max-h-[660px] overflow-y-auto ">
          <div className="pb-[16px] flex flex-col gap-[15px] border-b-[1px] border-b-[#e5e7eb]">
            <div className="text-[#4A4F63]">Thông tin người nhận</div>
            <TextField
              id="outlined-basic"
              label="Họ và tên"
              {...register("name", {
                required: "Name is required",
              })}
              className="inputAddressField"
              error={!!errors.name}
            />
            <TextField
              id="outlined-basic"
              label="Số điện thoại"
              type="number"
              {...register("phone", {
                required: "Phone is required",
              })}
              className="inputAddressField"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </div>
          <div className="py-[16px] flex flex-col gap-[15px] border-b-[1px] border-b-[#e5e7eb]">
            <div className="text-[#4A4F63]">Địa chỉ nhận hàng</div>
            <Controller
              name="province"
              control={control}
              rules={{ required: "Province is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Chọn Tỉnh/Thành phố"
                  variant="outlined"
                  className="inputAddressField"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={(event) =>
                    handleProvinceChange(event as SelectChangeEvent)
                  }
                >
                  {storeProvinces.map(({ code, nameWithType }) => (
                    <MenuItem key={code} value={nameWithType}>
                      {nameWithType}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="district"
              control={control}
              rules={{ required: "District is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Chọn Quận/Huyện"
                  variant="outlined"
                  className="inputAddressField"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={(event) =>
                    handleDistrictChange(event as SelectChangeEvent)
                  }
                  disabled={!selectedProvince}
                >
                  {filteredDistricts.map(({ code, nameWithType }) => (
                    <MenuItem key={code} value={nameWithType}>
                      {nameWithType}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="ward"
              control={control}
              rules={{ required: "Ward is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Chọn Xã/Phường"
                  variant="outlined"
                  className="inputAddressField"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={(event) =>
                    handleWardChange(event as SelectChangeEvent)
                  }
                  disabled={!selectedDistrict}
                >
                  {filteredWards.map(({ code, nameWithType }) => (
                    <MenuItem key={code} value={nameWithType}>
                      {nameWithType}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <TextField
              id="address"
              label="Address"
              multiline
              rows={3}
              className="inputAddressField"
              {...register("address")}
            />
            <TextField
              id="note"
              label="Note"
              multiline
              rows={3}
              className="inputAddressField"
              {...register("note")}
            />
          </div>
        </div>

        <div className="px-[24px] py-[10px] flex justify-center border-t-[#4cb551] border-t">
          <button
            type="submit"
            className="cursor-pointer mb-[12px] bg-[#4cb551] px-[24px] py-[12px] text-white font-bold w-full text-center rounded-3xl"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={openAnchor}
        onClose={() => setOpenAnchor(false)}
      >
        {detail()}
      </Drawer>
    </div>
  );
}
