
import {} from "react";
import { useCategoryContext } from "../../CategoryHomeContext";
import { EachInputTypeLeftProps } from "../../../../../../Config/interface";
export default function BoxInputLeftCategoryHome({
  index,
  eachType,
  typeContainer,
}: EachInputTypeLeftProps) {
  const { dispatch, filters } = useCategoryContext();
  return (
    <li
      onClick={() => {
        dispatch({
          type: "SET_PRICE_RANGE",
          priceRange: [
            { min: 0, max: 99999999 },
            { min: 0, max: 99999 },
            { min: 100000, max: 300000 },
            { min: 300000, max: 500000 },
            { min: 500001, max: 99999999 },
          ][index],
        });
      }}
      key={typeof eachType == "string" ? eachType : eachType.name}
      className={`specificTypeLeftCategoryHome`}
    >
      <div
        className={`${typeContainer} ${
          typeContainer == "boxTypeLeftCategoryHome" &&
          ((filters.priceRange &&
            index ==
              [
                { min: 0, max: 99999999 },
                { min: 0, max: 99999 },
                { min: 100000, max: 300000 },
                { min: 300000, max: 500000 },
                { min: 500001, max: 99999999 },
              ].findIndex(
                ({ min, max }) =>
                  min == filters.priceRange?.min &&
                  max == filters.priceRange.max
              )) ||
            (!filters.priceRange && index == 0)) &&
          "isChoseInputLeftType"
        }`}
      >
        {typeof eachType == "string" ? eachType : eachType.name}
      </div>
    </li>
  );
}
