import { Grid2 } from "@mui/material";
import "./../../../../../css/Home/Outlet/MainHome/typeOfProducts.css";
import { Link } from "react-router-dom";
import { storeTypes } from "../../../../../Config/glovalVariables";
function TypeOfProducts() {
  return (
    <Grid2 container spacing={1}>
      {storeTypes.map((eachType, index) => (
        <Grid2 size={1.2} className="eachType" key={index}>
          <Link to={eachType.linkURL}>
            <div className="storeImgEachType">
              <img src={`/TypeOfProducts/${index}.png`}></img>
            </div>

            <div className="nameEachType">{eachType.title}</div>
          </Link>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default TypeOfProducts;
