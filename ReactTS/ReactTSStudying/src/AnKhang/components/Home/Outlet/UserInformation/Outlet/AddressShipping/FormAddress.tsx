/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem, SelectChangeEvent, Switch, TextField } from "@mui/material";
import { AddressValuesProps, AddressShippingProps, ProvinceProps, DistrictProps, WardsProps } from "../../../../../../Config/interface";

const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return Object.values(response.data);
};

export default function FormAddress({
  open,
  setOpen,
  handleAddAddress,
  changeAddress,
  setChangeAddress,
  handleChangeAddress,
  handleDeleteAddress,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleAddAddress: (data: AddressValuesProps) => Promise<void>;
  changeAddress: AddressShippingProps | null;
  setChangeAddress: Dispatch<SetStateAction<AddressShippingProps | null>>;
  handleChangeAddress: (
    data: AddressValuesProps,
    addressShippingId: number
  ) => Promise<void>;
  handleDeleteAddress: (addressShippingId: number | undefined) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<AddressValuesProps>({
    defaultValues: {
      province: "",
      district: "",
      ward: "",
      fullName: "",
      phone: "",
      address: "",
      isDefault: true,
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
    setValue("fullName", changeAddress ? changeAddress.name : "");
    setValue("phone", changeAddress ? changeAddress.phone : "");
    setValue("province", changeAddress ? changeAddress.province : "");
    setValue("district", changeAddress ? changeAddress.district : "");
    setValue("ward", changeAddress ? changeAddress.ward : "");
    setValue("address", changeAddress ? changeAddress.address : "");
    setValue("isDefault", changeAddress ? changeAddress.defaultAddress : true);
    if (changeAddress) {
      const province = storeProvinces.find(
        (province) => province.nameWithType === changeAddress.province
      );
      if (province) {
        setFilteredDistricts(
          storeDistricts.filter(
            (district) => district.parentCode === province.code
          )
        );
      }

      const district = storeDistricts.find(
        (district) => district.nameWithType === changeAddress.district
      );
      if (district) {
        setFilteredWards(
          storeWards.filter((ward) => ward.parentCode === district.code)
        );
      }
    }
  }, [changeAddress]);

  const onSubmit: SubmitHandler<AddressValuesProps> = (data) => {
    setOpen(false);
    if (changeAddress) {
      handleChangeAddress(data, changeAddress.addressShippingId);
    } else {
      handleAddAddress(data);
    }

    setValue("fullName", "");
    setValue("phone", "");
    setValue("province", "");
    setValue("district", "");
    setValue("ward", "");
    setValue("address", "");
    setValue("isDefault", true);
  };

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

  const handleProvinceChange = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    const province = storeProvinces.find(
      ({ nameWithType }) => nameWithType === selectedName
    );
    if (province) {
      setValue("province", selectedName);
      setFilteredDistricts(
        storeDistricts.filter(({ parentCode }) => parentCode === province.code)
      );
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
      setValue("district", selectedName);
      setFilteredWards(
        storeWards.filter(({ parentCode }) => parentCode === district.code)
      );
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
          <div className="font-bold">Thêm địa chỉ mới</div>
          <div
            className="scale-80 cursor-pointer"
            onClick={() => {
              setOpen(false);
              if (changeAddress) {
                setChangeAddress(null);
              }
            }}
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
              className="inputAddressField"
              {...register("fullName", {
                required: "Name is required",
              })}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
            <TextField
              id="outlined-basic"
              label="Số điện thoại"
              type="number"
              className="inputAddressField"
              {...register("phone", {
                required: "Phone is required",
              })}
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
          </div>
          <div className="py-[8px] flex justify-between items-center border-b-[1px] border-b-[#e5e7eb]">
            <div className="text-[#4A4F63]">Đặt làm địa chỉ mặc định</div>
            <div>
              <Switch defaultChecked {...register("isDefault")} />
            </div>
          </div>
          {changeAddress && (
            <div className="p-[24px] text-[#d92d20] text-center font-bold">
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleDeleteAddress(changeAddress?.addressShippingId);
                  setOpen(false);
                  setChangeAddress(null);
                }}
              >
                Xóa địa chỉ
              </span>
            </div>
          )}
        </div>

        <div className="px-[24px] py-[16px] flex justify-center">
          <button
            type="submit"
            className="cursor-pointer mb-[12px] bg-[#4cb551] px-[24px] py-[12px] text-white font-bold w-full text-center rounded-3xl"
          >
            {changeAddress ? "Cập nhật" : "Hoàn tất"}
          </button>
        </div>
      </form>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={() => {
          setOpen(false);
          if (changeAddress) {
            setChangeAddress(null);
          }
        }}
      >
        {detail()}
      </Drawer>
    </div>
  );
}
