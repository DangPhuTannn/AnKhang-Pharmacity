import CategoryContext from "./components/DashBoard/CategoryContext";
import ProductContext from "./components/DashBoard/ProductContext";
import UserContext from "./components/User/UserContext";
import { VioletOnWednesday_Routes } from "./VioletOnWednesday_Routes";

export default function VioletOnWednesday() {
  return (
    <UserContext>
      <CategoryContext>
        <ProductContext>
          <VioletOnWednesday_Routes />
        </ProductContext>
      </CategoryContext>
    </UserContext>
  );
}
