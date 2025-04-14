import DoneIcon from "@mui/icons-material/Done";
import { useCategoryContext } from "../../CategoryHomeContext";
import { useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { getCategoryKey } from "../../../../../../Config/function";
import { EachInputTypeLeftProps } from "../../../../../../Config/interface";
export default function CheckBoxInputCategoryHome({
  index,
  storeTypeLeft,
  mainTitle,
  eachType,
  typeContainer,
}: EachInputTypeLeftProps) {
  const { dispatch } = useCategoryContext();
  const name = useMemo(() => {
    return typeof eachType == "string" ? eachType : eachType.name;
  }, [eachType]);

  return (
    <li
      onClick={() => {
        if (index != 0) {
          if (storeTypeLeft.has(name)) {
            dispatch({
              type: "REMOVE_FILTER",
              category: getCategoryKey(mainTitle),
              value: name,
            });
          } else {
            dispatch({
              type: "ADD_FILTER",
              category: getCategoryKey(mainTitle),
              value: name,
            });
          }
        } else {
          dispatch({
            type: "RESET_ONE_CATEGORY_FILTER",
            category: getCategoryKey(mainTitle),
          });
        }
      }}
      key={typeof eachType == "string" ? eachType : eachType.name}
      className={`specificTypeLeftCategoryHome`}
    >
      <div className={typeContainer}>
        <div
          className={`squareInputCheckBoxTypeLeft  ${
            (storeTypeLeft.has(name) ||
              (storeTypeLeft.size == 0 && index == 0)) &&
            "isChoseTypeLeft"
          }`}
        >
          {(storeTypeLeft.has(name) ||
            (storeTypeLeft.size == 0 && index == 0)) && (
            <DoneIcon className="squareTickChoseTypeLeft" />
          )}
        </div>
        <Tooltip id="checkBox-tooltip" />
        <span
          style={{ paddingLeft: 12, fontSize: 14 }}
          data-tooltip-id="checkBox-tooltip"
          data-tooltip-content={
            typeof eachType == "object" ? eachType.description : ""
          }
        >
          {name}
        </span>
      </div>
    </li>
  );
}
