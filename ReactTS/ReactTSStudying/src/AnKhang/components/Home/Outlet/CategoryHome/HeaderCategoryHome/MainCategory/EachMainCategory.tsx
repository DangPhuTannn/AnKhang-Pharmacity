import { Grid2 } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import { useCategoryContext } from "../../CategoryHomeContext";
import { generateSlug } from "../../../../../../Config/function";
import { CategoryProps } from "../../../../../../Config/interface";

export default function EachMainCategory({
  eachMainCategory,
  index,
  mainCategoryParam,
}: {
  eachMainCategory: CategoryProps;
  index: number;
  mainCategoryParam: string;
}) {
  const { originListMedicines } = useCategoryContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setCurrentIndex(0);
  }, [eachMainCategory, mainCategoryParam]);
  const { title, keyWords } = useMemo(() => {
    return eachMainCategory;
  }, [eachMainCategory]);
  const setKeyWords = useMemo(() => {
    return new Set(keyWords);
  }, []);
  const totalPages =
    Math.floor(keyWords.length / 5) + 1 + (keyWords.length % 5 == 0 ? -1 : 0);
  const handlePreArrow = () => {
    if (currentIndex > 0) {
      setCurrentIndex((preCurrentIndex) => preCurrentIndex - 1);
    }
  };
  const handleNextArrow = () => {
    if (totalPages && currentIndex < totalPages - 1) {
      setCurrentIndex((preCurrentIndex) => preCurrentIndex + 1);
    }
  };

  return (
    <>
      <Grid2 className="eachCategoryForm" container size={4}>
        <div className="leftEachCategoryForm">
          <Link
            to={`/home/category/${generateSlug(
              mainCategoryParam
            )}/${generateSlug(title)}`}
            className="linkLeftCategoryForm"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src={`/AnKhang/CategoryHome/${mainCategoryParam}${index}.png`}
            ></img>
            <div className="titleCategoryForm">{title}</div>
            <div className="totalMedicinesCategoryForm">
              {
                originListMedicines.filter((eachMedicine) =>
                  eachMedicine.categories.some((eachAttribute) =>
                    setKeyWords.has(eachAttribute.name)
                  )
                ).length
              }
            </div>
          </Link>

          {totalPages > 1 && (
            <div className="storeNextSubCategory">
              <div className="storeArrowCategory">
                <div className="storeEachArrowCategory">
                  <KeyboardArrowLeftIcon onClick={handlePreArrow} />
                </div>
                <div className="storeEachArrowCategory">
                  <KeyboardArrowRightIcon onClick={handleNextArrow} />
                </div>
              </div>
              <div className="storeDotsCategory">
                {Array.from({
                  length: totalPages || 0,
                }).map((_, index) => (
                  <FiberManualRecordIcon
                    key={index}
                    className={`dotCategory ${
                      currentIndex == index && "isActiveDotCategory"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="rightEachCategoryForm">
          {keyWords
            .slice(
              currentIndex * 5,
              Math.min(currentIndex * 5 + 5, keyWords.length)
            )
            .map((eachKeyWord, index) => (
              <Link
                to={`/home/category/${generateSlug(
                  mainCategoryParam
                )}/${generateSlug(title)}/${generateSlug(eachKeyWord)}`}
                className="eachSubCategoryHome multiline-ellipsis-CategoryName"
                key={index}
                data-tooltip-id="category-tooltip-mainCategory"
                data-tooltip-content={eachKeyWord}
              >
                {eachKeyWord}
                <Tooltip id="category-tooltip-mainCategory" />
              </Link>
            ))}
        </div>
      </Grid2>
    </>
  );
}
