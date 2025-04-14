import { Grid2 } from "@mui/material";
import { InforContactProps } from "../../interface/interface";

export default function InforContact(eachInforContact: InforContactProps) {
  const { title, text } = eachInforContact;
  return (
    <li className="contactText">
      <Grid2 size={12} container spacing={1}>
        <Grid2 size={4} className="titleContactText">
          {title}:
        </Grid2>
        <Grid2 size={6}>{text}</Grid2>
      </Grid2>
    </li>
  );
}
