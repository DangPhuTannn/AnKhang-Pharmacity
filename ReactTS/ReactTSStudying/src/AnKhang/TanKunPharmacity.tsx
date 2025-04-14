import { ConfirmDialog } from "primereact/confirmdialog";
import { AuthContext } from "./GlobalUtils/AuthContext";
import { BackdropProvider } from "./GlobalUtils/BackdropGlobal";
import { AnKhang_Routes } from "./Routes/AnKhang_Routes";
import "./css/ankhang.css";
export default function TanKunPharmacity() {
  return (

      <AuthContext>
        <BackdropProvider>
          <ConfirmDialog />
          <AnKhang_Routes />
        </BackdropProvider>
      </AuthContext>

  );
}
