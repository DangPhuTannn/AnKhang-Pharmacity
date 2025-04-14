import React, { createContext, useContext, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { BackdropContextProps } from "../Config/interface";

const BackdropContext = createContext<BackdropContextProps | undefined>(
  undefined
);

export const BackdropProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const showBackdrop = () => setOpen(true);
  const hideBackdrop = () => setOpen(false);

  return (
    <BackdropContext.Provider value={{ showBackdrop, hideBackdrop }}>
      {children}

      <Backdrop sx={() => ({ color: "#fff", zIndex: 9998 })} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </BackdropContext.Provider>
  );
};

export const useBackdrop = () => {
  const context = useContext(BackdropContext);
  if (!context) {
    throw new Error("useBackdrop must be used within a BackdropProvider");
  }
  return context;
};
