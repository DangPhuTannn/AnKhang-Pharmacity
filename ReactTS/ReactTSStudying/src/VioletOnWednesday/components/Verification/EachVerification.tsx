import { Grid2 } from "@mui/material";
import { EachVerificationProps } from "../../interface/interface";

export default function EachVerification(
  eachVerificationProps: EachVerificationProps
) {
  const { icon, title, text } = eachVerificationProps;

  return (
    <Grid2 size={4} container spacing={2}>
      <Grid2 className="storeIconVerification" size={3}>
        {icon}
      </Grid2>
      <Grid2 className="infoVerification" size={9}>
        <div className="titleInfoVerification"> {title}</div>
        <div className="textInfoVerification"> {text}</div>
      </Grid2>
    </Grid2>
  );
}
