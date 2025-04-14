import { Container, Grid2 } from "@mui/material";
import { useParams } from "react-router-dom";
import "./../../../../css/Home/Outlet/MainHome/medicineInformation.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MedicineProps } from "../../../../Config/interface";
import StarIcon from "@mui/icons-material/Star";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { storeAssuranceMedicineInformation } from "../../../../Config/glovalVariables";

import WarningIcon from "@mui/icons-material/Warning";
import useAxios from "../../../../Config/axiosInstance";
import { roundNumber, preventNonNumeric } from "../../../../Config/function";
import { useBackdrop } from "../../../../GlobalUtils/BackdropGlobal";
import { useCart } from "../Cart/CartContext";
import FormMedicine from "../MainHome/FormMedicine/FormMedicine";

export default function MedicineInformation() {
  const { productName } = useParams();
  const { addMedicineToCart } = useCart();
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const [medicine, setMedicine] = useState<MedicineProps | null>(null);
  let medicineID = String(medicine?.medicineId);
  while (medicineID.length < 8) {
    medicineID = "0" + medicineID;
  }
  const [quantity, setQuantity] = useState<number>(1);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setQuantity(newValue < 1 ? 1 : newValue > 999 ? 999 : newValue);
  }, []);
  const axiosInstance = useAxios();
  useEffect(() => {
    const getMedicineByName = async () => {
      if (!productName) {
        console.error("productNameParam is undefined or empty.");
        return;
      }
      showBackdrop();
      try {
        const responses = await axiosInstance.get(
          `/medicines/getMedicine/name?medicine_name=${encodeURIComponent(
            productName
          )}`
        );

        setMedicine(responses.data.result);
      } catch (error) {
        console.error("Error fetching medicines by name:", error);
      } finally {
        hideBackdrop();
      }
    };
    getMedicineByName();
  }, [productName]);

  const { price, discount, quyCach, totalQuantity } = useMemo(() => {
    const packageQuantity = medicine?.packageQuantity || "";
    const packageUnit = medicine?.packageUnit || "";
    const itemQuantityPerPackage = medicine?.itemQuantityPerPackage || "";
    const itemUnit = medicine?.itemUnit || "";
    const quyCach = `${packageQuantity} ${packageUnit} x ${itemQuantityPerPackage} ${itemUnit}`;
    return {
      price: medicine?.price || 0,
      discount: medicine?.discount || 0,
      packageQuantity,
      packageUnit,
      itemQuantityPerPackage,
      itemUnit,
      quyCach,
      totalQuantity: medicine?.totalQuantity || 0,
    };
  }, [medicine]);
  const storeOtherInformation = useMemo(() => {
    return [
      { name: "Đơn vị tính", value: medicine?.packageUnit },
      { name: "Quy cách", value: quyCach },
      { name: "Xuất sứ thương hiệu", value: medicine?.brand },
      { name: "Nước sản xuất", value: medicine?.originCountry },
      { name: "Thành phần", value: medicine?.ingredients },
      { name: "Mô tả ngắn", value: medicine?.description },
    ];
  }, [medicine]);

  return (
    <>
      <Container className="medicineInformation">
        <div className="medicineInformationContainer">
          <Grid2 className="imageMedicineInformation">
            <img src={`/AnKhang/Medicines/${medicine?.imageURL}`}></img>
          </Grid2>
          <Grid2 className="allMedicineInformation">
            <div className="medicineInformationBrand">
              Thương hiệu:
              <span style={{ color: "#4CB551" }}> {medicine?.brand}</span>
            </div>
            <div className="medicineInformationName">
              {medicine?.medicineName}
            </div>
            <div className="medicineInformationStatus">
              <div className="medicineInformationStatusName">{medicineID}</div>
              <div className="medicineInformationStatusStars">
                5{" "}
                <StarIcon
                  style={{ opacity: 0.55, color: "#FAA015" }}
                  fontSize="inherit"
                />
              </div>
              <div className="medicineInformationStatusRate">9 đánh giá </div>
              <div className="medicineInformationStatusComments">
                99 bình luận
              </div>
            </div>
            <div className="medicineInformationPrice">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(
                roundNumber(
                  discount != 0 ? (price * (100 - discount)) / 100 : price
                )
              )}

              <span className="medicineInformationPackage">
                {`/ ${medicine?.packageUnit}`}
              </span>
            </div>
            {discount != 0 && (
              <div className="medicineInformationRealPrice">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(roundNumber(price))}
              </div>
            )}
            {storeOtherInformation.map(({ name, value }, index) => (
              <div className="medicineInformationEach" key={index}>
                <div className="medicineInformationEachName">{name}</div>
                <div
                  className={`medicineInformationEachValue ${
                    name == "Đơn vị tính" && "medicineInformationBox"
                  }`}
                >
                  {value}
                </div>
              </div>
            ))}
            <div className="medicineInformationEach chooseQuantityMedicine">
              <div className="medicineInformationEachName">Chọn số lượng</div>
              <div className="medicineInformationEachValue chooseQuantityMedicine">
                <div
                  className={`decreaseQuantityMedicine ${
                    quantity <= 1 && "unactiveButtonChangeQuantity"
                  }`}
                  onClick={() =>
                    setQuantity((prevQuantity) =>
                      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
                    )
                  }
                >
                  <RemoveIcon className="decreaseQuantityMedicineIcon" />
                </div>
                <input
                  className="totalQuantityMedicine"
                  value={quantity}
                  onKeyDown={preventNonNumeric}
                  onChange={(e) => handleChange(e)}
                ></input>
                <div
                  className="increaseQuantityMedicine"
                  onClick={() =>
                    setQuantity((prevQuantity) => prevQuantity + 1)
                  }
                >
                  <AddIcon className="increaseQuantityMedicineIcon" />
                </div>
              </div>
            </div>
            {(totalQuantity <= 0 || medicine?.deleted) && (
              <div className="text-[15px] text-[#1f4eaf] flex items-center mt-[5px]">
                <WarningIcon className="mr-2" />
                Sản phẩm đang tạm hết hàng, dược sỹ sẽ liên hệ tư vấn.
              </div>
            )}
            <div className="medicineInformationStoreButtonBuy">
              {totalQuantity > 0 && !medicine?.deleted ? (
                <div
                  className="medicineInformationButtonBuy"
                  onClick={() =>
                    medicine?.medicineId &&
                    addMedicineToCart(medicine.medicineId, quantity)
                  }
                >
                  Chọn mua
                </div>
              ) : (
                <div className="medicineInformationButtonBuy">Tư vấn ngay</div>
              )}
            </div>
            <div className="medicineInformationStoreAssurances">
              {storeAssuranceMedicineInformation.map(
                ({ name, firstLine, otherLine }, index) => (
                  <div className="eachMedicineInformationAssurance" key={index}>
                    <div className="eachMedicineInformationAssuranceImage">
                      <img src={`/AnKhang/${name}.png`}></img>
                    </div>
                    <div className="eachMedicineInformationAssuranceText">
                      {firstLine} <br /> {otherLine}
                    </div>
                  </div>
                )
              )}
            </div>
          </Grid2>
        </div>
        {medicine?.categories && (
          <FormMedicine
            typeForm="Sản phẩm liên quan"
            defaultCategory={
              medicine?.categories.map((each) => each.name) || []
            }
            typeMedicine={[]}
          />
        )}
      </Container>
    </>
  );
}
