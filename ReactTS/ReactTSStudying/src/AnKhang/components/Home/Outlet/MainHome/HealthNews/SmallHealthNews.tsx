import { Grid2 } from "@mui/material";
import { HealthNewsProps } from "../../../../../Config/interface";
import { calculateTimeSinceCreation } from "../../../../../Config/function";

function SmallHealthNews({ title, createdAt, imageURL }: HealthNewsProps) {
  return (
    <Grid2 container spacing={2} size={12} className="eachHealthNews">
      <Grid2 size={5} className="imageHealthNews">
        <img src={`/HealthNews/${imageURL}`}></img>
      </Grid2>
      <Grid2 size={7} className="nameEachHealthNews">
        <div className="nameHealthNews">{title}</div>
        <div className="timeCreateHealthNews">
          {calculateTimeSinceCreation(createdAt)}
        </div>
      </Grid2>
    </Grid2>
  );
}
export default SmallHealthNews;
