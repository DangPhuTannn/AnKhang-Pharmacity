import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error403 from "../ErrorPages/Error403";
import Error404 from "../ErrorPages/Error404";
import ProtectedRoute from "./ProtectedRoute";
import MainHome from "../components/Home/Outlet/MainHome/MainHome";
import Cart from "../components/Home/Outlet/Cart/Cart";
import DashBoard from "../components/DashBoard/DashBoard";
import ProductManagement from "../components/DashBoard/ProductManagement/ProductManagement";
import CategoryHome from "../components/Home/Outlet/CategoryHome/CategoryHome";
import AddressManagement from "../components/Home/Outlet/UserInformation/Outlet/AddressShipping/AddressManagement";
import OrderForm from "../components/Home/Outlet/UserInformation/Outlet/Order/OrderForm";
import UserInformationOption from "../components/Home/Outlet/UserInformation/Outlet/UserOption/UserInformationOption";
import UserInformation from "../components/Home/Outlet/UserInformation/UserInformationLayOut/UserInformation";
import Login from "../components/LoginAndSignUp/Login";
import LoginAndSignUp from "../components/LoginAndSignUp/LoginAndSignUp";
import SignUp from "../components/LoginAndSignUp/SignUp";
import Home from "../components/Home/HomeLayOut/Home";
import OrderManagement from "../components/Home/Outlet/UserInformation/Outlet/Order/OrderManagement";
import { OrderManagementDashBoard } from "../components/DashBoard/OrderManagement/OrderManagementDashBoard";
import AttributeManagement from "../components/DashBoard/AttributeManagement/AttributeManagement";
import UserManagement from "../components/DashBoard/UserManagement/UserManagement";
import MedicineInformation from "../components/Home/Outlet/MedicineInformation/MedicineInformation";
import Overview from "../components/DashBoard/Overview/Overview";
import TempOverview from "../components/DashBoard/Overview/TempOverview";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404 />,
    element: <LoginAndSignUp></LoginAndSignUp>,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute allowRoles={["CLIENT"]}>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <MainHome />,
      },
      {
        path: "/home/category/:mainCategoryParam",
        element: <CategoryHome />,
      },
      {
        path: "/home/category/:mainCategoryParam/:subCategoryParam",
        element: <CategoryHome />,
      },
      {
        path: "/home/category/:mainCategoryParam/:subCategoryParam/:categoryParam",
        element: <CategoryHome />,
      },
      {
        path: "/home/search/:productName",
        element: <CategoryHome />,
      },
      {
        path: "/home/product/:productName",
        element: <MedicineInformation />,
      },
      {
        path: "/home/cart/myCart",
        element: <Cart />,
      },
      {
        path: "/home/myInfor",
        element: <UserInformation />,
        children: [
          {
            index: true,
            path: "/home/myInfor/myProfile",
            element: <UserInformationOption />,
          },
          {
            path: "/home/myInfor/myAddress",
            element: <AddressManagement />,
          },
          {
            path: "/home/myInfor/myOrder",
            element: (
              <OrderManagement>
                <OrderForm />
              </OrderManagement>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowRoles={["ADMIN"]}>
        <DashBoard />
      </ProtectedRoute>
    ),
    errorElement: <Error404 />,
    children: [
      { index: true, element: <TempOverview /> },
      { path: "/admin/productManagement", element: <ProductManagement /> },
      { path: "/admin/orderManagement", element: <OrderManagementDashBoard /> },
      { path: "/admin/attributeManagement", element: <AttributeManagement /> },
      { path: "/admin/userManagement", element: <UserManagement /> },
    ],
  },
  {
    path: "/403",
    element: <Error403 />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
export function AnKhang_Routes() {
  return <RouterProvider router={router} />;
}
