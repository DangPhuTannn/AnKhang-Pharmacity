import { Grid2 } from "@mui/material";
import { ButtonMedicineProps } from "../../../../../Config/interface";

function ButtonMedicine({
  storeButton,
  children,
  onClick,
}: ButtonMedicineProps) {
  return (
    <Grid2 className={storeButton} onClick={onClick}>
      <Grid2 className="medicineButton">{children}</Grid2>
    </Grid2>
  );
}

export default ButtonMedicine;
