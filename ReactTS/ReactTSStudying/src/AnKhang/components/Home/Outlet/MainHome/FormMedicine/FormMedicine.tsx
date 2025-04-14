import { Grid2 } from "@mui/material";
import "./../../../../../css/Home/Outlet/MainHome/formMedicine.css";
import { useEffect, useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Medicine from "./Medicine";
import ButtonMedicine from "./ButtonMedicine";
import { useParams } from "react-router-dom";
import useAxios from "../../../../../Config/axiosInstance";
import { FormMedicineProps, MedicineProps } from "../../../../../Config/interface";
import { useBackdrop } from "../../../../../GlobalUtils/BackdropGlobal";

function FormMedicine({
  typeForm,
  typeMedicine,
  defaultCategory,
}: FormMedicineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { productName } = useParams();
  const [listMedicines, setListMedicines] = useState<MedicineProps[]>([]);
  const [getCategory, setGetCategory] = useState<string[]>(defaultCategory);
  const { showBackdrop, hideBackdrop } = useBackdrop();
  const [indexChoseType, setIndexChoseType] = useState(0);
  const axiosInstance = useAxios();
  useEffect(() => {
    setGetCategory(defaultCategory);
  }, [productName]);
  useEffect(() => {
    const handleGetCategoryMedicines = async () => {
      showBackdrop();
      try {
        const responses = await axiosInstance.post("/medicines/allAttributes", {
          priceRange: null,
          listAttributeFilters: [
            { attributeType: "CATEGORY", attributeValues: getCategory },
          ],
          sortOrder: "desc",
          searchValue: "",
        });
        setListMedicines(responses.data.result);
      } catch (error) {
        console.error("Error fetching medicines by category:", error);
      } finally {
        hideBackdrop();
      }
    };
    handleGetCategoryMedicines();
  }, [getCategory]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 5 < 0 ? listMedicines.length - 5 : prevIndex - 5
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 5 >= listMedicines.length ? 0 : prevIndex + 5
    );
  };
  return (
    <>
      <Grid2 className="formMedicine" container>
        <Grid2 className="headerFormMedicine" container size={12}>
          <Grid2 size={3} container className="typeFormMedicine">
            <Grid2 size={2}>
              <img src="/AnKhang/FormMedicine/daulan.png" alt="logo"></img>
            </Grid2>
            <Grid2 size={10}>
              <h3>{typeForm}</h3>
            </Grid2>
          </Grid2>
          <Grid2 size={9}>
            <div className="typeMedicineContainer">
              {typeMedicine.map(({ title, keyWords }, index) => (
                <div
                  className={`typeMedicine ${
                    index == indexChoseType && "choseTypeMedicine"
                  }`}
                  key={index}
                  onClick={() => (
                    setCurrentIndex(0),
                    setGetCategory(keyWords),
                    setIndexChoseType(index)
                  )}
                >
                  {title}
                </div>
              ))}
            </div>
          </Grid2>
        </Grid2>
        <Grid2 className="bodyFormMedicine" container spacing={2} size={12}>
          {listMedicines
            .filter((eachMedicine) => eachMedicine.medicineName != productName)
            .slice(currentIndex, currentIndex + 5)
            .map((eachMedicine, index) => (
              <Medicine
                medicineData={eachMedicine}
                sizeEachMedicine={2.4}
                key={index}
              ></Medicine>
            ))}
        </Grid2>

        <ButtonMedicine
          storeButton="storePrevMedicineButton"
          onClick={handlePrev}
        >
          <NavigateBeforeIcon className="arrowMedicine"></NavigateBeforeIcon>
        </ButtonMedicine>
        <ButtonMedicine
          storeButton="storeNextMedicineButton"
          onClick={handleNext}
        >
          <NavigateNextIcon className="arrowMedicine"></NavigateNextIcon>
        </ButtonMedicine>
      </Grid2>
    </>
  );
}
export default FormMedicine;
