import { useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useCategoryContext } from "../../CategoryHomeContext";
export default function HeaderRightBodyCategoryHome() {
  const { dispatch, filters } = useCategoryContext();
  const [isGrid, setIsGrid] = useState(true);
  return (
    <div className="headerRightBodyCategoryHome">
      <span
        style={{
          fontSize: 18,
          fontWeight: "bold",
          width: "20%",
          display: "flex",
          alignItems: "center",
        }}
      >
        Danh sách sản phẩm
      </span>
      <div className="storeOptionsHeaderRightBodyCategoryHome">
        Sắp xếp theo
        <div
          className={`storePriceHeaderRightBodyCategoryHome ${
            filters.sortOrder == "asc" && "isPriceActive"
          }`}
          onClick={() =>
            dispatch({
              type: "ADD_FILTER",
              category: "sortOrder",
              value: "asc",
            })
          }
        >
          Giá Thấp
        </div>
        <div
          className={`storePriceHeaderRightBodyCategoryHome ${
            filters.sortOrder == "desc" && "isPriceActive"
          }`}
          onClick={() =>
            dispatch({
              type: "ADD_FILTER",
              category: "sortOrder",
              value: "desc",
            })
          }
        >
          Giá Cao
        </div>
        <div className="storeStyleDisplayMedicinesRightBodyCategoryHome">
          <div
            className={`toggleStyleDisplayMedicinesRightBodyCategoryHome ${
              isGrid ? "grid-active" : "list-active"
            }`}
          ></div>
          <GridViewIcon
            className={`iconStyleDisplayMedicinesRightBodyCategoryHome ${
              isGrid ? "active" : ""
            }`}
            onClick={() => setIsGrid(true)}
          />

          <ListAltIcon
            className={`iconStyleDisplayMedicinesRightBodyCategoryHome ${
              !isGrid ? "active" : ""
            }`}
            onClick={() => setIsGrid(false)}
          />
        </div>
      </div>
    </div>
  );
}
