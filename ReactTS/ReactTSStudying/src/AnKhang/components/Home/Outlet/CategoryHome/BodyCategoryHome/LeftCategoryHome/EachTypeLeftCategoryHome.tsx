
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useCategoryContext } from "../../CategoryHomeContext";

import CheckBoxInputCategoryHome from "./CheckBoxInputLeftCategoryHome";
import BoxInputLeftCategoryHome from "./BoxInputLeftCategoryHome";
import { getCategoryKey } from "../../../../../../Config/function";
import { TypeLeftCategoryHomeProps } from "../../../../../../Config/interface";
export default function EachTypeLeftCategoryHome({
  mainTitle,
  haveSearchBar,
  typeContainer,
  listType,
}: TypeLeftCategoryHomeProps) {
  const { filters } = useCategoryContext();
  const storeTypeLeft = filters[getCategoryKey(mainTitle)].attributeValues;
  const [clickedForMore, setClickedForMore] = useState(mainTitle == "Giá bán");
  const [currentIndexListType, setCurrentIndexListType] = useState(
    Math.min(6, listType.length)
  );
  useEffect(() => {
    setCurrentIndexListType(Math.min(6, listType.length));
  }, [listType]);
  return (
    <div className="storeEachTypeLeftCategoryHome">
      <div
        className="storeTitleTypeLeftCategoryHome"
        onClick={() => setClickedForMore((prevClick) => !prevClick)}
      >
        <div className="titleTypeLeftCategoryHome">{mainTitle}</div>
        <div className="storeArrowEachTypeLeftCategoryHome">
          {clickedForMore ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
      </div>

      {clickedForMore && (
        <>
          {haveSearchBar && (
            <div className="storeSearchBarEachTypeLeftCategoryHome specificTypeLeftCategoryHome">
              <SearchIcon />
              <input
                type="text"
                placeholder="Tìm theo tên..."
                className="searchBarEachTypeLeftCategoryHome"
              ></input>
            </div>
          )}
          <ul className="storeListTypeLeftCategoryHome">
            {listType.slice(0, currentIndexListType).map((eachType, index) =>
              typeContainer == "checkboxTypeLeftCategoryHome" ? (
                <CheckBoxInputCategoryHome
                  {...{
                    index,
                    storeTypeLeft,
                    eachType,
                    mainTitle,
                    typeContainer,
                  }}
                  key={typeof eachType == "string" ? eachType : eachType.name}
                />
              ) : (
                <BoxInputLeftCategoryHome
                  {...{
                    index,
                    storeTypeLeft,
                    eachType,
                    mainTitle,
                    typeContainer,
                  }}
                  key={typeof eachType == "string" ? eachType : eachType.name}
                />
              )
            )}
          </ul>
          {currentIndexListType < listType.length && (
            <div
              className="storeShowMoreListTypeLeftCategoryHome specificTypeLeftCategoryHome"
              onClick={() =>
                setCurrentIndexListType((prevIndex) =>
                  Math.min(prevIndex + 5, listType.length)
                )
              }
            >
              <KeyboardDoubleArrowDownIcon className="iconShowMoreListTypeLeftCategoryHome" />{" "}
              Xem thêm
            </div>
          )}
        </>
      )}
    </div>
  );
}
