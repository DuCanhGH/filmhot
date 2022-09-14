import App from "./App";
import Category from "./pages/Category";
import Discovery from "./pages/Discovery";
import Explore from "./pages/Explore";
import History from "./pages/History";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import TV from "./pages/TV";
import NonExistentPage from "./pages/NonExistent";
import Error from "./components/Shared/Error";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "*",
        element: <NonExistentPage />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movie/:id",
        element: <Movie />,
      },
      {
        path: "tv/:id",
        element: <TV />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "category/:id",
        element: <Category />,
      },
      {
        path: "discovery",
        element: <Discovery />,
      },
    ],
  },
]);
