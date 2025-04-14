import { Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { StoreCategoryHomeContextProps } from "../../CategoryHomeContext";
import { useContext } from "react";
import { generateSlug } from "../../../../../../Config/function";
export default function EachSubCategory({
  eachKeyWord,
  index,
  mainCategoryParam,
  subCategoryParam,
}: {
  eachKeyWord: string;
  index: number;
  mainCategoryParam: string;
  subCategoryParam: string;
}) {
  const getProvider = useContext(StoreCategoryHomeContextProps);
  if (!getProvider) {
    throw new Error("asdasd");
  }
  const { originListMedicines } = getProvider;
  return (
    <Grid2 size={3} container className="subCategoryForm" key={index}>
      <Link
        to={`/home/category/${generateSlug(mainCategoryParam)}/${generateSlug(
          subCategoryParam
        )}/${generateSlug(eachKeyWord)}`}
        className="linkSubcategory"
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="leftSubCategory">
          <img
            src={`/AnKhang/CategoryHome/${mainCategoryParam}/${subCategoryParam}${index}.png`}
          ></img>
        </div>
        <div className="rightSubCategory">
          <div
            className="multiline-ellipsis-CategoryName"
            data-tooltip-id="category-tooltip-subCategory"
            data-tooltip-content={eachKeyWord}
          >
            {eachKeyWord}
          </div>
          <Tooltip id="category-tooltip-subCategory" />
          <div className="subCategoryTotal">
            {
              originListMedicines.filter(({ categories }) =>
                new Set(
                  categories.map((eachAttribute) => eachAttribute.name)
                ).has(eachKeyWord)
              ).length
            }
          </div>
        </div>
      </Link>
    </Grid2>
  );
}
