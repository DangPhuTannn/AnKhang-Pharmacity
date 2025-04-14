import { Container, Grid2 } from "@mui/material";

import "./../../../css/ankhang.css";
import Header from "./Header/Header";

import { decorationItems } from "../../../Config/glovalVariables";
import { Outlet } from "react-router-dom";
import { CartContext } from "../Outlet/Cart/CartContext";
import Verification from "./Verification/Verification";
import Footer from "./Footer/Footer";
import { ToastContainer } from "react-toastify";

function Home() {
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
      <CartContext>
        <div className="wrapper">
          {decorationItems.map(({ imageURL, classCSS }, index) => (
            <Grid2 className={classCSS} key={index}>
              <img src={imageURL}></img>
            </Grid2>
          ))}
          <Grid2 className="headerBackground">
            <Container>
              <Header></Header>
            </Container>
          </Grid2>
          <Grid2 className="bodyContainer">
            <Outlet />
          </Grid2>

          <Grid2 className="storeVerification">
            <Container>
              <Verification></Verification>
            </Container>
          </Grid2>
          <Footer></Footer>
        </div>
      </CartContext>
    </>
  );
}

export default Home;
