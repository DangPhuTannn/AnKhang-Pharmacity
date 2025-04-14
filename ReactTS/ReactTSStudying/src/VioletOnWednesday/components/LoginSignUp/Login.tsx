import { TextField } from "@mui/material";
import Title from "../Title";
import { useForm, SubmitHandler } from "react-hook-form";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./../../css/login.css";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../User/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
type FormValues = {
  username: string;
  password: string;
};
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await axios.get(
      `http://localhost:3001/user?username=${data.username}&password=${data.password}`
    );
    if (response.data.length > 0) {
      setUser(response.data[0]);
      navigate("/home");
    } else {
      toast.error("Wrong user");
    }
  };
  return (
    <div className="mt-[30px]">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Title title="ĐĂNG NHẬP" />
      <div className="flex justify-between gap-[50px] mt-[30px]">
        <div className="w-[30%] font-bold">
          Nếu bạn đã có Tài khoản, hãy Đăng Nhập để sử dụng dịch vụ của chúng
          tôi 1 cách tốt nhất
        </div>
        <div className="w-[60%]">
          <div className="w-fit">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  className="mt-1 block w-[350px] inputLoginField"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  error={!!errors.username}
                  helperText={errors.username ? errors.username.message : ""}
                />
              </div>
              <div className="mb-4">
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  className="mt-1 block w-[350px] inputLoginField"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-[#662d91] text-[15px] cursor-pointer">
                  Quên mật khẩu?
                </div>
                <button
                  type="submit"
                  className="bg-[#662d91] text-white font-bold text-center w-[55%] py-[8px] cursor-pointer "
                  disabled={isSubmitting}
                >
                  Đăng Nhập
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
