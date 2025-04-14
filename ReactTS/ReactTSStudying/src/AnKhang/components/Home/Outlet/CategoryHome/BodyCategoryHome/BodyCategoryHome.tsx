import LeftBodyCategoryHome from "./LeftCategoryHome/LeftBodyCategoryHome";
import "./../../../../../css/Home/Outlet/CategoryHome/bodyCategoryHome.css";
import RightBodyCategoryHome from "./RightCategoryHome/RightCategoryHome";

export default function BodyCategoryHome() {
  return (
    <div className="bodyCategoryHome">
      <LeftBodyCategoryHome />
      <RightBodyCategoryHome />
    </div>
  );
}
