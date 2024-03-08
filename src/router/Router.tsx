import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Map from "../pages/map";
import App from "../App";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "map",
        element: <Map />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={routerConfig} />;
};

export default Router;
