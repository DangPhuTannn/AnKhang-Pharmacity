import { Container } from "@mui/material";
import { typeMedicine } from "../../../../Config/glovalVariables";
import Advertisement from "./Advertisement/Advertisement";
import AllFormMedicines from "./FormMedicine/AllFormMedicines";
import HealthNews from "./HealthNews/HealthNews";
import MostFind from "./MostFind/MostFind";
import TypeOfProducts from "./TypeOfProducts/TypeOfProducts";

export default function MainHome() {
  return (
    <Container>
      <Advertisement></Advertisement>
      <TypeOfProducts></TypeOfProducts>
      <AllFormMedicines></AllFormMedicines>
      <HealthNews></HealthNews>
      <MostFind typeMedicine={typeMedicine}></MostFind>
    </Container>
  );
}
