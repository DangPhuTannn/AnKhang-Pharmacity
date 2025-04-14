import { Button } from "@mui/material";
import { UserProps } from "../../../../../../Config/interface";
import ProfileItem from "./ProfileItem";
import {
  CalendarIcon,
  EditIcon,
  MailIcon,
  PhoneIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
export default function FormProfile({
  user,
  handleShowChange,
}: {
  user: UserProps | null;
  handleShowChange: () => void;
}) {
  return (
    <div className="flex justify-center pt-[12px] pb-[24px]">
      {" "}
      <div className="flex flex-col items-center">
        <div className="w-[100px] h-[100px]">
          <img src="/AnKhang/avatarDefault.png"></img>
        </div>
        <div className="w-[400px] mx-auto bg-white  rounded-lg overflow-hidden">
          <div className="p-6 space-y-4">
            <ProfileItem
              icon={<UserIcon className="text-gray-600" />}
              label="Họ và tên"
              value={user?.name}
            />
            <ProfileItem
              icon={<MailIcon className="text-gray-600" />}
              label="Email"
              value={user?.email}
            />
            <ProfileItem
              icon={<PhoneIcon className="text-gray-600" />}
              label="Số điện thoại"
              value={user?.phone}
            />
            <ProfileItem
              icon={<StarIcon className="text-gray-600" />}
              label="Rank"
              value={user?.rankClient}
            />
            <ProfileItem
              icon={<StarIcon className="text-gray-600" />}
              label="Loyalty Points"
              value={user?.loyaltyPoint}
            />
            <ProfileItem
              icon={<UserIcon className="text-gray-600" />}
              label="Giới tính"
              value={user?.gender ? "Nam" : "Nữ"}
            />
            <ProfileItem
              icon={<CalendarIcon className="text-gray-600" />}
              label="Ngày sinh"
              value={user?.doB}
            />

            <Button
              onClick={handleShowChange}
              variant="contained"
              color="success"
              sx={{
                backgroundColor: "#4cb551",
              }}
              className="mt-6 w-full flex items-center justify-center gap-2 text-white py-2 rounded-lg transition-all"
            >
              <EditIcon className="w-5 h-5" /> Chỉnh sửa thông tin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
