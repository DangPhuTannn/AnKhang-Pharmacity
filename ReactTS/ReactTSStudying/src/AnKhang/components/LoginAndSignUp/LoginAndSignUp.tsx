import { Grid2 } from "@mui/material";

import "./../../css/LoginAndSignUp/loginAndSignUp.css";
import { Outlet } from "react-router-dom";
import { decorationItems } from "../../Config/glovalVariables";
import { ToastContainer } from "react-toastify";

export default function LoginAndSignUp() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      {decorationItems.map(({ imageURL, classCSS }, index) => (
        <Grid2 className={classCSS} key={index}>
          <img src={imageURL}></img>
        </Grid2>
      ))}
      <div className="loginAndSignUpContainer">
        <Outlet />
      </div>
    </>
  );
}
