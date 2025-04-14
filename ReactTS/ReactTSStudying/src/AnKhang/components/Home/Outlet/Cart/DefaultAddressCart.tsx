import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import FaceIcon from "@mui/icons-material/Face";
import { addDays, format } from "date-fns";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { AddressShippingProps } from "../../../../Config/interface";
export default function DefaultAddressCart({
  defaultAddress,
  note,
  setNote,
}: {
  defaultAddress: AddressShippingProps | null;
  setNote: Dispatch<SetStateAction<string>>;
  note: string;
}) {
  const navigate = useNavigate();
  return (
    <div className="mt-[20px]">
      {defaultAddress?.name ? (
        <>
          <div className="flex justify-between items-center">
            <div className="text-[14px] font-bold">Hình thức giao hàng</div>
            <div className="bg-[#4CB551] text-white px-[40px] py-[6px] rounded-3xl text-[14px]">
              Giao hàng tận nơi
            </div>
          </div>
          <div className="bg-white mt-[10px] rounded-t-2xl p-[16px] gap-[20px] flex flex-col">
            <div className="flex gap-[1.25rem]">
              <div className="text-[#4CB551]">
                <LocationOnIcon className="scale-125" />
              </div>
              <div className="flex flex-col gap-[10px]">
                <div>Nhà</div>
                <div className="text-[20px] font-bold">
                  {defaultAddress?.address}
                </div>
                <div className="text-[#657384]">
                  {`${defaultAddress?.ward}, ${defaultAddress?.district}, ${defaultAddress?.province}`}
                </div>
              </div>
            </div>
            <div className="flex gap-[1.25rem]">
              <div className="text-[#4CB551]">
                <FaceIcon className="scale-125" />
              </div>
              <div className="flex flex-col gap-[10px] w-full">
                <div className="flex items-center gap-[10px]">
                  <div className="font-bold">{defaultAddress?.name}</div>
                  <div className="bg-[#657384] w-[5px] h-[5px] rounded-full"></div>
                  <div className="text-[#4a4f63]">{defaultAddress?.phone}</div>
                </div>

                <TextField
                  id="outlined-basic"
                  label="Ghi chú ( Không bắt buộc ) "
                  variant="outlined"
                  multiline
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="inputNoteCart"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-b-2xl p-[16px] flex gap-[1.25rem] mt-[2px]">
            <AccessAlarmIcon className="text-[#4CB551] scale-125" />
            <div className="text-[#4a4f63]">Thời gian nhận hàng dự kiến</div>
            <div className="font-bold">
              {format(addDays(new Date(), 3), "dd/MM/yyyy")}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl p-[16px] flex justify-center">
          <div className="flex flex-col gap-[10px] items-center">
            <MyLocationIcon className="scale-300 mt-[20px] text-[#4CB551]" />
            <div className="mt-[20px] text-[18px] font-bold">
              Hiện tại chưa có địa chỉ nhận hàng
            </div>
            <div
              className="bg-[#4cb551] rounded-2xl py-[8px] px-[34px] text-white cursor-pointer"
              onClick={() => navigate("/home/myInfor/myAddress")}
            >
              Tạo địa chỉ
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
