import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import Layout from "./Components/Layout/Layout.jsx";
import Login from "./Pages/Login.jsx";
import LogOut from "./Pages/LogOut.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import AuthMessage from "./Pages/AuthMessage.jsx";
import Gurd from "./Pages/Gurd.jsx";
import SignUp from "./Pages/SignUp.jsx";
import { lazy } from "react";

// Lazy-loaded components (for code splitting)
const Add = lazy(() => import("./Pages/AddPost.jsx"));
const Edit = lazy(() => import("./Pages/EditPost.jsx"));
const Details = lazy(() => import("./Pages/PostDetails.jsx"));
// const Logout = lazy(()=>import("./Pages/LogOut.jsx"))
// const Signup = lazy(()=>import("./Pages/SignUp.jsx"))

// Route Loader: Validates the :id param in the URL
//  Prevents access if ID is not a number
const postParamHandler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", {
      status: 400,
      statusText: "Please make sure to insert a correct post ID",
    });
  }
};

let routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />, // Fallback for route errors
    children: [
      { index: true, element: <App /> },
      { index: "post", element: <App /> },
      { path: "auth", element: <AuthMessage /> },

      // Route: /AddPost (lazy-loaded + protected)
      {
        path: "AddPost",
        element: (
          <Suspense fallback="loading please wait ...">
            <Gurd>
              <Add />
            </Gurd>
          </Suspense>
        ),
      },

      // Route: /post/:id/edit (lazy-loaded + protected + ID validation)
      {
        path: "post/:id/edit",
        element: (
          <Suspense fallback="loading please wait ...">
            <Gurd>
              <Edit />
            </Gurd>
          </Suspense>
        ),
        loader: postParamHandler,
      },
      { path: "login", element: <Login /> },
      { path: "logout", element: <LogOut /> },
      { path: "/signup", element: <SignUp /> },

      // Route: /post/:id (details page with ID validation + error handling)
      {
        path: "post/:id",
        element: (
          <Suspense fallback="loading please wait ...">
            <Details />
          </Suspense>
        ),
        loader: postParamHandler,

        // If ID invalid or fetch fails
        errorElement: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);
