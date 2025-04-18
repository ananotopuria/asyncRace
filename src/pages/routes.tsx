import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import GaragePage from "./garagePage";
import WinnersPage from "./winnersPage";
import NotFoundPage from "./notFoundPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <GaragePage />,
      },
      {
        path: "/winners",
        element: <WinnersPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
