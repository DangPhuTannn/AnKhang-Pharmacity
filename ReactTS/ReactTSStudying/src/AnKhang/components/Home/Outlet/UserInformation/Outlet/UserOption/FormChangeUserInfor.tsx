/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import useAxios from "../../../../../../Config/axiosInstance";
import { useBackdrop } from "../../../../../../GlobalUtils/BackdropGlobal";
import { MutableRefObject, useCallback, useMemo, useState } from "react";
import { UserProps } from "../../../../../../Config/interface";
import { toast } from "react-toastify";
import axios from "axios";
import { showConfirmDialog } from "../../../../../../Config/functionTSX";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { GridApi } from "ag-grid-enterprise";
interface FormValues {
  name: string;
  email: string;
  phone: number;
  doB: string;
  gender: string;
  address: string;
  currentPassword: string;
  newPassword: string;
}
export default function FormChangeUserInfor({
  user,
  setUser,
  handleClose,
  isAdminAction,
  handleUpdateUser,
  gridApiRef,
}: {
  user: UserProps | null;
  isAdminAction: boolean;
  setUser?: React.Dispatch<React.SetStateAction<UserProps | null>>;
  handleClose: () => void;
  handleUpdateUser?: (
    updateUser: UserProps,
    gridApi: GridApi | null | undefined
  ) => void;
  gridApiRef?: MutableRefObject<GridApi<any> | null>;
}) {
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      currentPassword: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState({
    code: 0,
    message: "",
  });
  const doB = useMemo(() => {
    const storedoB = user?.doB.split("/");
    return storedoB ? storedoB[2] + "-" + storedoB[1] + "-" + storedoB[0] : "";
  }, [user]);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      showBackdrop();
      const storedoB = data.doB.split("-");
      const mainDOB = storedoB[2] + "/" + storedoB[1] + "/" + storedoB[0];
      const currentPassword = data.currentPassword;
      const newPassword = data.newPassword;
      if (currentPassword.length > 0 || newPassword.length > 0) {
        if (newPassword.includes(" ")) {
          return setError("newPassword", {
            type: "manual",
            message: "Password cannot contain space",
          });
        }
        if (newPassword.length < 8) {
          return setError("newPassword", {
            type: "manual",
            message: "Password must be at least 8 character",
          });
        }
      }
      const updateData = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        gender: data.gender == "Nam" ? true : false,
        doB: mainDOB,
        currentPassword,
        newPassword,
      };

      const response = await axiosInstance.put(
        `/user/update/${user?.email}`,
        updateData
      );
      if (response.data.code == 1000) {
        if (!isAdminAction) {
          setUser?.(response.data.result);
        } else {
      
          handleUpdateUser?.(response.data.result, gridApiRef?.current);
        }
        setErrorMessage({ code: 0, message: "" });
        toast.success("Change info successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { code, message } = error.response?.data || {};
        setErrorMessage({
          code: code || 500,
          message: message || "An error occurred",
        });
      } else {
        setErrorMessage({
          code: 500,
          message: "An unexpected error occurred",
        });
      }
    } finally {
      hideBackdrop();
    }
  };
  const confirmSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    showConfirmDialog({
      message: (
        <div style={{ whiteSpace: "pre-line" }}>
          {`Are you sure you want to update?`}
        </div>
      ),
      accept: () => handleSubmit(onSubmit)(),
    });
  }, []);
  return (
    <div className="flex justify-center pt-[12px] pb-[24px] ">
      <div className="flex flex-col items-center">
        <div className="w-[100px] h-[100px]">
          <img src="/AnKhang/avatarDefault.png"></img>
        </div>
        <form
          onSubmit={confirmSubmit}
          className="w-[400px] px-[16px]"
          noValidate
        >
          <TextField
            label="Họ và tên"
            variant="outlined"
            className="inputChangingField"
            defaultValue={user?.name}
            {...register("name", {
              required: "Họ và tên là bắt buộc",
            })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
          <TextField
            label="Email"
            variant="outlined"
            className="inputChangingField disableInputChangingField"
            defaultValue={user?.email}
            disabled
          />

          <TextField
            type="password"
            label="Current Password"
            variant="outlined"
            className={`inputChangingField ${isAdminAction && "!hidden"}`}
            {...register("currentPassword")}
            error={errorMessage.code == 2003}
            helperText={
              errorMessage.code == 2003
                ? errorMessage.message
                : "Let this field blank if you do not want to change the password"
            }
          />
          <TextField
            type="password"
            label="New Password"
            variant="outlined"
            className="inputChangingField"
            {...register("newPassword")}
            disabled={
              isAdminAction ? false : watch("currentPassword").length < 8
            }
            error={!!errors.newPassword}
            helperText={errors.newPassword && errors.newPassword.message}
          />
          <TextField
            label="Họ và tên"
            variant="outlined"
            className="inputChangingField"
            defaultValue={user?.name}
            {...register("name", {
              required: "Họ và tên là bắt buộc",
            })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
          <TextField
            label="Số điện thoại"
            type="number"
            variant="outlined"
            className="inputChangingField"
            defaultValue={user?.phone}
            {...register("phone", {
              required: "Số điện thoại là bắt buộc",
            })}
            error={errorMessage.code == 2004 || !!errors.phone}
            helperText={
              (errorMessage.code == 2004 && errorMessage.message) ||
              (errors.phone && errors.phone.message)
            }
          />
          <div className="text-left">
            <FormControl
              component="fieldset"
              className="!mb-[10px] radioUserInfor text-left"
            >
              <FormLabel component="legend">Giới tính</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                defaultValue={user?.gender ? "Nam" : "Nữ"}
              >
                <FormControlLabel
                  value="Nam"
                  control={<Radio />}
                  label="Nam"
                  {...register("gender", {
                    required: "Giới tính là bắt buộc",
                  })}
                />
                <FormControlLabel
                  value="Nữ"
                  control={<Radio />}
                  label="Nữ"
                  {...register("gender", {
                    required: "Giới tính là bắt buộc",
                  })}
                />
              </RadioGroup>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender.message}
                </p>
              )}
            </FormControl>
          </div>
          <TextField
            id="date"
            label="Ngày sinh"
            type="date"
            variant="outlined"
            className="inputChangingField"
            defaultValue={doB}
            {...register("doB", { required: "Ngày sinh là bắt buộc" })}
            error={errorMessage.code == 2006 || !!errors.doB}
            helperText={
              (errorMessage.code == 2006 && errorMessage.message) ||
              (errors.doB && errors.doB.message)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="address"
            type="text"
            label="Address"
            multiline
            rows={3}
            InputLabelProps={{
              shrink: true,
            }}
            className="inputChangingField !mb-[15px]"
            defaultValue={user?.address}
            {...register("address")}
          />
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="contained"
              className="flex justify-between items-center gap-1"
              onClick={handleClose}
            >
              {!isAdminAction && <ArrowBackIosIcon className="scale-70" />}
              {isAdminAction ? "Cancel" : "Back"}
            </Button>
            <Button
              type="submit"
              sx={{ backgroundColor: "#4cb551", color: "white" }}
              variant="contained"
              color="success"
              className="  font-bold text-center py-[8px] cursor-pointer rounded-3xl"
              disabled={isSubmitting}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
