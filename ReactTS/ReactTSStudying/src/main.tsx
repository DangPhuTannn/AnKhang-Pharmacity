import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import CssBaseline from "@mui/material/CssBaseline";

// import TempTest from "./TodoList/tempTest.tsx";
// import ShoppingCart from "./ShoppingCart/ShoppingCart.tsx";
import TanKunPharmacity from "./AnKhang/TanKunPharmacity.tsx";
import VioletOnWednesday from "./VioletOnWednesday/VioletOnWednesday.tsx";

import StoreComponents from "./CSE483/WaterSystem/StoreComponents.tsx";
import InitialPage from "./CSE483/WaterSystem/InitialPage.tsx";
import { DataProvider } from "./CSE483/WaterSystem/DataProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <TanKunPharmacity />
    {/* <DataProvider>
      <StoreComponents>
        <InitialPage />
      </StoreComponents>
    </DataProvider> */}
    {/* <VioletOnWednesday /> */}
  </StrictMode>
);
