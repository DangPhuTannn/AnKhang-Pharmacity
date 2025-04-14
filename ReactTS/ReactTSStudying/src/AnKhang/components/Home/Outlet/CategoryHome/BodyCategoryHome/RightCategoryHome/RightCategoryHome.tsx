import BodyRightBodyCategoryHome from "./RightBodyCategoryHome";
import HeaderRightBodyCategoryHome from "./HeaderRightBodyCategoryHome";
import ListCategoriesBar from "./ListCategoriesBar";

export default function RightCategoryHome() {
  return (
    <div className="rightBodyCategoryHome">
      <HeaderRightBodyCategoryHome />
      <ListCategoriesBar/>
      <BodyRightBodyCategoryHome />
    </div>
  );
}

