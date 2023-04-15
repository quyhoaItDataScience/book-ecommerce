import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import OrderListPage from "./pages/OrderListPage";
import ProfilePage from "./pages/ProfilePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import MainAdmin from "./pages/admin";
import ListBooks from "./pages/admin/ListBooks";
import CreateBook from "./pages/admin/CreateBook";
import Categories from "./pages/admin/Categories";
import ListUsers from "./pages/admin/ListUsers";
import OrderList from "./pages/admin/OrderList";
import OrderDetails from "./pages/admin/OrderDetails";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./layouts/ProtectedRoute";
import CartProvider from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import ChatUser from "./pages/admin/ChatUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/checkout/success",
        element: <CheckoutSuccessPage />,
      },
      {
        path: "/order-list",
        element: <OrderListPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <MainAdmin />,
      },
      {
        path: "books",
        element: <ListBooks />,
      },
      {
        path: "create-book",
        element: <CreateBook />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "users",
        element: <ListUsers />,
      },
      {
        path: "orders",
        element: <OrderList />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "chat",
        element: <ChatUser />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const theme = createTheme({
  palette: {
    grey: {
      background: "#fafafa",
      main: "#fafafa",
    },
    sidebar: {
      bg: "#233044",
      color: "#eeeeee",
      hoverBg: "#1e293a",
      activeBg: "#1e253a",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="top-center"
          theme="colored"
          autoClose={1500}
        />
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
