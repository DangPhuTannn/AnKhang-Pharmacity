import { Container } from "@mui/material";
import "./../css/body.css";
import Header from "./Header/FirstRow/Header";
import Menu from "./Menu/Menu";
import FormContact from "./FormContact/FormContact";

import { Outlet } from "react-router-dom";
import CartContext from "./User/CartContext";

export default function Home() {
  return (
    <>
      <CartContext>
        <header className="relative">
          <Header></Header>
          <Menu></Menu>
        </header>
        <body>
          <Container>
            <Outlet />
          </Container>
        </body>
        <footer>
          <FormContact></FormContact>
          <div className="linkFooter">
            &copy; 2015 Violet on Wednesday Store. All Rights Reserved.
            Sponsored by Letsop Solutions.
          </div>
        </footer>
      </CartContext>
    </>
  );
}
