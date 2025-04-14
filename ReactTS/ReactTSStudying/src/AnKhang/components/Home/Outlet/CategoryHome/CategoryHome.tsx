import { Container } from "@mui/material";
import "./../../../../css/Home/Outlet/CategoryHome/categoryHome.css";
import { useParams } from "react-router-dom";

import HeaderCategoryHome from "./HeaderCategoryHome/HeaderCategoryHome";
import BreadcrumsCategoryHome from "./BreadcrumsCategoryHome/BreadcrumsCategoryHome";
import { CategoryHomeContext } from "./CategoryHomeContext";
import BodyCategoryHome from "./BodyCategoryHome/BodyCategoryHome";
export default function CategoryHome() {
  const { categoryParam, productName } = useParams();
  return (
    <CategoryHomeContext>
      <Container className="categoryHomeContainer">
        {!productName && <BreadcrumsCategoryHome />}
        {!categoryParam && <HeaderCategoryHome />}
        <BodyCategoryHome />
      </Container>
    </CategoryHomeContext>
  );
}
