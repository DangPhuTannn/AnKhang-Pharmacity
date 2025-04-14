
import  { useCallback, useState } from "react";

import { useAuth } from "../../../../../../GlobalUtils/AuthContext";

import FormProfile from "./FormProfile";
import FormChangeUserInfor from "./FormChangeUserInfor";

export default function UserInformationOption() {
  const [isShowUserChange, setIsShowUserChange] = useState(false);
  const { user, setUser } = useAuth();
  const handleShowChange = useCallback(() => {
    setIsShowUserChange(true);
  }, []);
  const handleClose = useCallback(() => {
    setIsShowUserChange(false);
  }, []);

  return (
    <div className="bg-white rounded-[15px]">
      <div className=" px-[16px] py-[12px] font-bold border-[#E4E8ED] border-b-[1px]">
        Thông tin cá nhân
      </div>
      {isShowUserChange ? (
        <FormChangeUserInfor isAdminAction={false} setUser={setUser} user={user} handleClose={handleClose}/>
      ) : (
        <FormProfile handleShowChange={handleShowChange} user={user} />
      )}
    </div>
  );
}
