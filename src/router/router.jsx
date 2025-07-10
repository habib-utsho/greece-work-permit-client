import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Homepage from "../pages/Homepage";
import DashboardLayout from "../MainLayout/DashboardLayout";
import WorkPermitManagement from "../pages/Dashboard/workPermitManagement/WorkPermitManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
  {
    path: "/secure-dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "greece-work-permit",
        element: <WorkPermitManagement />,
      },
    ],
  },
]);
