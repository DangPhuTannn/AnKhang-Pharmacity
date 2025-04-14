import { useCategoryContext } from "../../CategoryHomeContext";
import { Grid2 } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getCategoryKey } from "../../../../../../Config/function";
import { storeMedicineAttributes } from "../../../../../../Config/glovalVariables";

export default function ListCategoriesBar() {
  const { dispatch, filters } = useCategoryContext();
  const listCategoriesBar = storeMedicineAttributes.flatMap((mainTitle) => {
    const temp = Array.from(filters[getCategoryKey(mainTitle)].attributeValues);

    return temp.length > 0 && mainTitle != "Loại"
      ? temp.map((eachCategory) => (
          <div className="eachCategoryBar" key={eachCategory}>
            {eachCategory}
            <CloseIcon
              className="closeButtonEachCategoryBar"
              onClick={() => {
                dispatch({
                  type: "REMOVE_FILTER",
                  category: getCategoryKey(mainTitle),
                  value: eachCategory,
                });
              }}
            />
          </div>
        ))
      : [];
  });
  return (
    <>
      {listCategoriesBar.length > 0 && (
        <Grid2 container spacing={1} className="listCategoriesBar">
          <div className="firstListCategoriesBar">
            {`Lọc theo (${listCategoriesBar.length})`}
          </div>
          <> {listCategoriesBar.map((eachList) => eachList)}</>
          <div
            className="lastListCategoriesBar"
            onClick={() => {
              dispatch({
                type: "RESET_FILTER",
              });
            }}
          >
            Xóa tất cả
          </div>
        </Grid2>
      )}
    </>
  );
}
