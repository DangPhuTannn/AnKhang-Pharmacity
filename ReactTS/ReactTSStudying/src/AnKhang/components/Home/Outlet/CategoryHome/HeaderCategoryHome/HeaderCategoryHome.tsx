import { useParams } from "react-router-dom";
import { Grid2, Typography } from "@mui/material";
import MainCategory from "./MainCategory/MainCategory";
import SubCategory from "./SubCategory/SubCategory";
import { reverseSlug } from "../../../../../Config/function";


export default function HeaderCategoryHome() {
  const { mainCategoryParam, subCategoryParam } = useParams();
  return (
    <div className="headerCategoryHome">
      <Typography variant="h6" className="mainTitleCategoryForm">
        {subCategoryParam
          ? reverseSlug(subCategoryParam)
          : reverseSlug(mainCategoryParam)}
      </Typography>
      <Grid2 container spacing={2}>
        {!subCategoryParam ? <MainCategory /> : <SubCategory />}
      </Grid2>
    </div>
  );
}
