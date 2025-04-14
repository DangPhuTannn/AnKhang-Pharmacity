import { Grid2 } from "@mui/material";
import { NewsProps } from "../../interface/interface";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export default function News(eachFlower: NewsProps) {
  const { name, imageURL, date } = eachFlower;
  return (
    <>
      <Grid2 container spacing={1} size={12} className="eachNews">
        <img src={`/Lab1/Image/Advertisement/Images/${imageURL}`}></img>
        <Grid2 size={7.8} className="nameNews">
          {name}
          <Grid2 className="dateNews">
            <CalendarMonthIcon className="iconNews"></CalendarMonthIcon>
            {date}
          </Grid2>
        </Grid2>
      </Grid2>
      <div className="dashdash"></div>
    </>
  );
}
