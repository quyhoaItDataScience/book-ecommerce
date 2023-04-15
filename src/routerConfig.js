import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";

export default router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
]);
