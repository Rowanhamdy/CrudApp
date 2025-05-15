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

// Route Loader: Validates the :id param in the URL
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
      { path: "auth", element: <AuthMessage /> },
      {
        path: "AddPost",
        element: (
          <Suspense fallback={<div className="spinner">Loading...</div>}>
            <Gurd>
              <Add />
            </Gurd>
          </Suspense>
        ),
      },
      {
        path: "post/:id/edit",
        element: (
          <Suspense fallback={<div className="spinner">Loading...</div>}>
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
      {
        path: "post/:id",
        element: (
          <Suspense fallback={<div className="spinner">Loading...</div>}>
            <Details />
          </Suspense>
        ),
        loader: postParamHandler,
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
