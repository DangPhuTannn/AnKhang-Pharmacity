
import { storeEachFormStyle } from "../../../../../Config/glovalVariables";
import FormMedicine from "./FormMedicine";

export default function AllFormMedicines() {
  return (
    <>
      {storeEachFormStyle.map((eachFormMedicine, index) => (
        <FormMedicine {...eachFormMedicine} key={index}></FormMedicine>
      ))}
    </>
  );
}
