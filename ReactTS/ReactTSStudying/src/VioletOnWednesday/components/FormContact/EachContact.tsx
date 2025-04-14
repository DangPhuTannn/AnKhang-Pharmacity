import { Grid2 } from "@mui/material";
import { EachContactProps } from "../../interface/interface";
import Contact from "./Contact";

export default function EachContact(eachContact: EachContactProps) {
  const { title, listContacts } = eachContact;

  return (
    <Grid2 size={3}>
      <div className="titleContact">
        {title}
        <div className="slideUnderTitleContact"></div>
      </div>
      <ul>
        {listContacts.map((contactText,index) => (
          <Contact contact={contactText} key={index}></Contact>
        ))}
      </ul>
    </Grid2>
  );
}
