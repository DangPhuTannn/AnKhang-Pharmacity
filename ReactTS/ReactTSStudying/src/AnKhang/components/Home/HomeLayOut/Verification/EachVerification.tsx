import { Grid2 } from "@mui/material";
import { EachVerificationProps } from "../../../../Config/interface";

function EachVerification({ image, title, text }: EachVerificationProps) {
  return (
    <Grid2 size={3} container>
      <Grid2 size={12} container>
        <Grid2 size={1.5} className="imageEachVerification">
          {image}
        </Grid2>
        <Grid2 size={8.5}>
          <div className="titleEachVerification">{title.toUpperCase()}</div>
          <div className="textEachVerification">
            {text == "Xem chi tiết" ? <a href="#">{text}</a> : text}
          </div>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default EachVerification;
