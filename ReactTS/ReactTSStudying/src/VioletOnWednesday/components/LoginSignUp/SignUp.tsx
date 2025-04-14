import { TextField } from "@mui/material";
import Title from "../Title";
import { useForm, SubmitHandler } from "react-hook-form";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./../../css/login.css";
type FormValues = {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const email = watch("email");
  const password = watch("password");
  return (
    <div className="mt-[30px]">
      <Title title="ĐĂNG KÝ" />
      <div className="flex justify-between gap-[50px] mt-[30px]">
        <div className="w-[30%] font-bold">
          Hãy ĐĂNG KÝ thành viên để nhận được những ưu đãi và thông tin khuyến
          mãi từ chúng tôi
        </div>
        <div className="w-[60%]">
          <div className="w-fit">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <TextField
                  id="name"
                  label="Họ và tên"
                  variant="outlined"
                  className="mt-1 block w-[350px] inputLoginField"
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message:
                        "Invalid name.Only letters and spaces are allowed",
                    },
                  })}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              </div>
              <div className="mb-4">
                <TextField
                  id="email"
                  label="Email đăng nhập"
                  variant="outlined"
                  className="mt-1 block w-[350px] inputLoginField"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              </div>
              <div className="mb-4">
                <TextField
                  id="confirmEmail"
                  label="Nhập lại Email"
                  variant="outlined"
                  className="mt-1 block w-[350px] inputLoginField"
                  {...register("confirmEmail", {
                    required: "Confirm Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                    validate: (value) =>
                      value == email || "Emails do not match",
                  })}
                  error={!!errors.confirmEmail}
                  helperText={
                    errors.confirmEmail ? errors.confirmEmail.message : ""
                  }
                />
              </div>
              <div className="mb-4">
                <TextField
                  id="password"
                  label="Mật khẩu"
                  variant="outlined"
                  type="password"
                  className="mt-1 block w-[350px] inputLoginField"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
              </div>
              <div className="mb-4">
                <TextField
                  id="confirmPassword"
                  label="Nhập lại mật khẩu"
                  variant="outlined"
                  type="password"
                  className="mt-1 block w-[350px] inputLoginField"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value == password || "Confirm Password do not match",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ""
                  }
                />
              </div>
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="bg-[#662d91] text-white font-bold text-center w-[55%] py-[8px] cursor-pointer "
                >
                  ĐĂNG KÝ
                  <ArrowForwardIosIcon className="scale-70 ml-[10px]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
