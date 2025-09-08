import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./shared/AppLayout";
import Main from "./pages/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ index: true, element: <Main /> }],
  },
  {
    path: "/dashboard",
    element: <AppLayout />,
    children: [{ index: true, element: <Dashboard /> }],
  },
]);
