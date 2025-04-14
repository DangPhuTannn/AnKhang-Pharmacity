import { Grid2 } from "@mui/material";
import { TextContactProps } from "../../../../Config/interface";


export function FormContact({
  title,
  storeText,
  sizeContact,
}: {
  title: string;
  storeText: TextContactProps[];
  sizeContact: number;
}) {
  return (
    <Grid2 size={Number(sizeContact)}>
      <div className="titleEachContact">{title}</div>
      <ul className="listEachContact">
        {storeText.map(({ text, phoneNum }, index) => (
          <li key={index}>
            {text}
            <div className="phoneNumEachContact">{phoneNum}</div>
          </li>
        ))}
      </ul>
    </Grid2>
  );
}
