import { Grid2 } from "@mui/material";
import "./../../../../../css/Home/Outlet/MainHome/healthnews.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SmallHealthNews from "./SmallHealthNews";
import { healthNewsArray } from "../../../../../Config/glovalVariables";
import { calculateTimeSinceCreation } from "../../../../../Config/function";
function HealthNews() {
  return (
    <Grid2 className="formHealthNews" container>
      <Grid2 className="headerFormHealthNews" container size={12}>
        <Grid2 size={3} container>
          <Grid2 size={2}>
            <img src="/AnKhang/FormMedicine/daulan.png" alt="logo"></img>
          </Grid2>
          <Grid2 size={10} className="typeFormMedicine">
            <h3>Bản tin sức khỏe</h3>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 className="bodyFormHealthNews" container spacing={2} size={12}>
        <Grid2 size={4}>
          <Grid2 size={12} className="mainHealthNews">
            <img src={`/HealthNews/${healthNewsArray[0].imageURL}`}></img>
            <div className="nameHealthNews">{healthNewsArray[0].title}</div>
            <div className="timeCreateHealthNews">
              {calculateTimeSinceCreation(healthNewsArray[0].createdAt)}
            </div>
          </Grid2>
        </Grid2>
        <Grid2 size={4}>
          {healthNewsArray
            .slice(1, 4)
            .map(({ title, createdAt, imageURL }, index) => (
              <SmallHealthNews
                title={title}
                createdAt={createdAt}
                imageURL={imageURL}
                key={index}
              ></SmallHealthNews>
            ))}
        </Grid2>
        <Grid2 size={4}>
          {healthNewsArray
            .slice(4, 7)
            .map(({ title, createdAt, imageURL }, index) => (
              <SmallHealthNews
                title={title}
                createdAt={createdAt}
                imageURL={imageURL}
                key={index}
              ></SmallHealthNews>
            ))}
        </Grid2>
      </Grid2>
      <Grid2 size={12} className="storeHealthNewsButton">
        <NavigateNextIcon className="healthNewsButton"></NavigateNextIcon>
        Xem tất cả
      </Grid2>
    </Grid2>
  );
}

export default HealthNews;
