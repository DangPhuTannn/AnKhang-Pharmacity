import { Grid2 } from "@mui/material";
import { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useCategoryContext } from "../../CategoryHomeContext";
import { useParams } from "react-router-dom";
import Medicine from "../../../MainHome/FormMedicine/Medicine";

export default function RightBodyCategoryHome() {
  const { listMedicines, dispatch, originListMedicines } = useCategoryContext();
  const { productName } = useParams();
  const [currentTotalMedicines, setCurrentTotalMedicines] = useState(12);
  return (
    <>
      {listMedicines.length > 0 ? (
        <Grid2 container spacing={2} className="bodyRightBodyCategoryHome">
          {listMedicines
            .slice(0, Math.min(currentTotalMedicines, listMedicines.length))
            .map((eachMedicine, index) => (
              <Medicine
                key={index}
                medicineData={eachMedicine}
                sizeEachMedicine={3}
              />
            ))}
        </Grid2>
      ) : (
        <div className="bodyRightBodyCategoryHomeDontHave">
          <span style={{ color: "#4a4f63", fontSize: 18, fontWeight: "bold" }}>
            Ôi! Không tìm thấy sản phẩm nào phù hợp{" "}
          </span>
          {!productName ||
          (originListMedicines && originListMedicines?.length > 0) ? (
            <>
              <span style={{ color: "#657384", fontSize: 16 }}>
                Hãy thử lại bằng cách thay đổi điều kiện lọc
              </span>
              <span style={{ color: "#657384", fontSize: 16 }}>hoặc</span>
              <div
                className="bodyRightBodyCategoryHomeDontHaveDelelteCategories"
                onClick={() => {
                  dispatch({
                    type: "RESET_FILTER",
                  });
                }}
              >
                Xóa tất cả bộ lọc
              </div>
            </>
          ) : (
            <span style={{ color: "#657384", fontSize: 16 }}>
              Hãy thử lại bằng cách thay đổi từ khóa{" "}
              <span className="font-bold text-[16px] text-[#4cb551]">{`"${productName}"`}</span>
            </span>
          )}
        </div>
      )}
      {currentTotalMedicines < listMedicines.length && (
        <div
          className="showMoreMedicinesRightBodyCategoryHome"
          onClick={() =>
            setCurrentTotalMedicines((prevTotal) => prevTotal + 12)
          }
        >
          <KeyboardDoubleArrowDownIcon className="iconStyleDisplayMedicinesRightBodyCategoryHome" />
          Xem thêm {listMedicines.length - currentTotalMedicines} sản phẩm
        </div>
      )}
    </>
  );
}
