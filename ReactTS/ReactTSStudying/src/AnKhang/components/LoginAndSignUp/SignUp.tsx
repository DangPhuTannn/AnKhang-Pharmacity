import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useBackdrop } from "../../GlobalUtils/BackdropGlobal";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: number;
  doB: string;
  address: string;
}
export default function SignUp() {
  const navigate = useNavigate();
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const [errorMessage, setErrorMessage] = useState({
    code: 0,
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();
  const passwordCheck = watch("password");
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const name = data.fullName;
    const email = data.email;
    const password = data.password;
    const phone = data.phone;
    const address = data.address;
    const storedoB = data.doB.split("-");
    const doB = storedoB[2] + "/" + storedoB[1] + "/" + storedoB[0];

    try {
      showBackdrop();
      const response = await axios.post(
        "http://localhost:8080/ankhang/user/createAccount",
        {
          name,
          email,
          password,
          phone,
          address,
          doB,
          gender: true,
        }
      );
      if (response.status == 200) {
        setErrorMessage({
          code: 0,
          message: "",
        });
        toast.success("Sign up successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
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
    <div className="signUpContainer">
      <div className="storeLoginTitle">
        <p className="loginTitle">Create Account</p>
        <div className="storeLoginSubTitle">
          <p className="loginSubTitle">
            Create an account so you can explore TanKun Pharmacity
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[30px] flex flex-col justify-center items-center"
      >
        <TextField
          id="fullname"
          label="Full Name"
          variant="outlined"
          className="w-[70%] inputLoginField !mb-[15px]"
          {...register("fullName", {
            required: "Name is required",
          })}
          error={!!errors.fullName}
          helperText={errors.fullName && errors.fullName.message}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          className="w-[70%] inputLoginField !mb-[15px] "
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Wrong email form",
            },
          })}
          error={errorMessage.code == 2001 || !!errors.email}
          helperText={
            (errorMessage.code == 2001 && errorMessage.message) ||
            (errors.email && errors.email.message)
          }
        />
        <div className="grid grid-cols-2 gap-2">
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            className="passwordInputSignUpField inputLoginField !mb-[15px]"
            {...register("password", {
              required: "Password is required",
              validate: {
                containsSpace: (value) =>
                  !value.includes(" ") || "Password cannot contain spaces",
                minLength: (value) =>
                  value.trim().length >= 8 ||
                  "Password must be at least 8 characters",
              },
            })}
            fullWidth
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />
          <TextField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            className="inputLoginField  !mb-[15px]"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: {
                matchPassword: (value) =>
                  value == passwordCheck || "Passwords do not match",
              },
            })}
            fullWidth
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
        </div>
        <div className="flex justify-between w-[70%]">
          <TextField
            id="PhoneNumber"
            label="Phone Number"
            type="number"
            className=" inputLoginField !mb-[15px] w-[59%]"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^\d+$/,
                message: "Only number is allowed",
              },
            })}
            InputLabelProps={{
              shrink: true,
            }}
            error={errorMessage.code == 2004 || !!errors.phone}
            helperText={
              (errorMessage.code == 2004 && errorMessage.message) ||
              (errors.phone && errors.phone.message)
            }
          />
          <TextField
            id="doB"
            type="date"
            {...register("doB", {
              required: "Date is required",
            })}
            error={errorMessage.code == 2006 || !!errors.doB}
            helperText={
              (errorMessage.code == 2006 && errorMessage.message) ||
              (errors.doB && errors.doB.message)
            }
          />
        </div>
        <TextField
          id="address"
          label="Address"
          multiline
          rows={3}
          className="w-[70%] inputLoginField !mb-[15px]"
          {...register("address")}
        />

        <Button
          variant="contained"
          type="submit"
          className="w-[70%] inputLoginField  buttonLoginField !mb-[15px]"
        >
          Sign Up
        </Button>
      </form>

      <div className="storeCreateNavigation">
        <Link to="/" className="linkNavigation">
          Already have an account
        </Link>
      </div>
    </div>
  );
}
