import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Map from "../pages/map";
import App from "../App";
import Contact from "../pages/contact";
import Places from "../pages/places";
import Project from "../pages/project";

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
      {
        path: "project",
        element: <Project />,
      },
      {
        path: "places",
        element: <Places />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={routerConfig} />;
};

export default Router;
