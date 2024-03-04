import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
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
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={routerConfig} />;
};

export default Router;
