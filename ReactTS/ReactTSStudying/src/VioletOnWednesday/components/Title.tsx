import { Grid2 } from "@mui/material";
import "./../css/title.css";
export default function Title({ title }: { title: string }) {
  return (
    <Grid2 className="bigTitle" size={12}>
      {title}
    </Grid2>
  );
}
