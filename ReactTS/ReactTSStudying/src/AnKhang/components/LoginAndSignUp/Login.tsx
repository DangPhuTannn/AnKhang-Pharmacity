import { Button, Grid2, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import AppleIcon from "@mui/icons-material/Apple";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../GlobalUtils/AuthContext";
import { useBackdrop } from "../../GlobalUtils/BackdropGlobal";

interface FormValues {
  email: string;
  password: string;
}

const storeIconLoginWays: React.ReactNode[] = [
  <GoogleIcon className="eachIconLoginWay" />,
  <FacebookRoundedIcon className="eachIconLoginWay" />,
  <AppleIcon className="eachIconLoginWay" />,
];

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [errorMessage, setErrorMessage] = useState({
    code: 0,
    message: "",
  });
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const email = data.email;
    const password = data.password;
    showBackdrop();
    try {
      const response = await axios.post(
        "http://localhost:8080/ankhang/auth/token",
        {
          email,
          password,
        }
      );
      if (response.data.result.authenticated) {
        toast.success("Login successfully");
        const { userResponse, token } = response.data.result;
        const roles = userResponse.roles;
        setErrorMessage({ code: 0, message: "" });
        setTimeout(() => {
          navigate(roles.includes("ADMIN") ? "/admin" : "/home");
        }, 1000);
        localStorage.setItem("user", JSON.stringify(userResponse));
        localStorage.setItem("token", token);
        setUser(userResponse);
        setToken(token);
        console.log(userResponse);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { code, message } = error.response?.data || {};
        setErrorMessage({ code, message });
      }
    } finally {
      hideBackdrop();
    }
  };

  return (
    <div className="loginContainer">
      <div className="storeLoginTitle">
        <p className="loginTitle">Login Here</p>
        <div className="storeLoginSubTitle">
          <p className="loginSubTitle">
            Welcome back to TanKun Pharmacity <br></br>You've been missed
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[30px] flex flex-col justify-center items-center"
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="w-[70%]  inputLoginField marginBottom20"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Wrong email form",
            },
          })}
          error={
            errorMessage.code === 2002 ||
            !!errors.email ||
            errorMessage.code === 3
          }
          helperText={
            (errorMessage.code === 2002 && errorMessage.message) ||
            (errors.email && errors.email.message) ||
            (errorMessage.code === 3 && errorMessage.message)
          }
        />

        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          autoComplete="current-password"
          className="w-[70%] inputLoginField inputLoginField marginBottom20"
          {...register("password", {
            required: "Password is required",
          })}
          error={errorMessage.code === 2003 || !!errors.password}
          helperText={
            (errorMessage.code === 2003 && errorMessage.message) ||
            (errors.password && errors.password.message)
          }
        />

        <div className="storeForgotPassword">
          <Link to="/" className="linkNavigation">
            Forgot your password?
          </Link>
        </div>

        <Button
          variant="contained"
          className="w-[70%] inputLoginField buttonLoginField marginBottom20"
          type="submit"
        >
          Sign IN
        </Button>
      </form>
      <div className="storeCreateNavigation">
        <Link to="/signup" className="linkNavigation">
          Create new account
        </Link>
      </div>
      <div className="formOtherLoginWays">
        <p>Or continue with</p>
        <Grid2 container spacing={1} justifyContent="center">
          {storeIconLoginWays.map((eachIcon, index) => (
            <Grid2 className="eachOtherLoginWay" key={index}>
              {eachIcon}
            </Grid2>
          ))}
        </Grid2>
      </div>
    </div>
  );
}
