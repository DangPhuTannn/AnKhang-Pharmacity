import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authorize from "./components/User/Authorize";

// Sử dụng React.lazy để tải các component lười biếng
const Home = React.lazy(() => import("./components/Home"));
const MainHome = React.lazy(() => import("./components/MainHome/MainHome"));
const Product = React.lazy(() => import("./components/Product/Product"));
const DashBoard = React.lazy(() => import("./components/DashBoard/DashBoard"));
const CategoryTable = React.lazy(
  () => import("./components/DashBoard/CategoryTable")
);
const ProductTable = React.lazy(
  () => import("./components/DashBoard/ProductTable")
);
const ShippingPage = React.lazy(() => import("./components/ShippingPage"));
const BigNews = React.lazy(() => import("./components/BigNews/BigNews"));
const Login = React.lazy(() => import("./components/LoginSignUp/Login"));
const SignUp = React.lazy(() => import("./components/LoginSignUp/SignUp"));
const Cart = React.lazy(() => import("./components/User/Cart"));
const SearchProduct = React.lazy(
  () => import("./components/Product/SearchProduct")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MainHome />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: "/products/:productName",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SearchProduct />
          </Suspense>
        ),
      },
      {
        path: "/news",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BigNews />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/shipping",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ShippingPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Authorize>
        <Suspense fallback={<div>Loading...</div>}>
          <DashBoard />
        </Suspense>
      </Authorize>
    ),
    children: [
      {
        index: true,
        element: <div className="text-5xl">Đây là trang admin</div>,
      },
      {
        path: "/admin/categoryManagement",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CategoryTable />
          </Suspense>
        ),
      },
      {
        path: "/admin/productManagement",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProductTable />
          </Suspense>
        ),
      },
    ],
  },
]);

export function VioletOnWednesday_Routes() {
  return <RouterProvider router={router} />;
}
