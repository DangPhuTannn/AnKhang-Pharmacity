import { Grid2 } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ContentProps } from "../../../../Config/interface";
import { Link } from "react-router-dom";
import { generateSlug } from "../../../../Config/function";

function EachContent({ mainTitle, relatives }: ContentProps) {
  return (
    <Grid2 className="eachContent">
      <Link to={`/home/category/${generateSlug(mainTitle)}`}>{mainTitle}</Link>
      <KeyboardArrowDownIcon className="arrowDown"></KeyboardArrowDownIcon>
      <nav className="formRelative">
        <Link to={`/home/category/${generateSlug(mainTitle)}`}>
          <li className="firstRelative">XEM TẤT CẢ {mainTitle}</li>
        </Link>
        {relatives.map(({ title }, index) => (
          <Link
            to={`/home/category/${generateSlug(mainTitle)}/${generateSlug(
              title
            )}`}
            key={index}
          >
            <li className="eachRelative">{title}</li>
          </Link>
        ))}
      </nav>
    </Grid2>
  );
}

export default EachContent;
