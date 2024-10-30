import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Calendar from "./routes/calendar";
import ErrorPage from "./routes/error-page";
import Login from "./routes/login";
import NotFoundPage from "./routes/not-found";
import Profile from "./routes/profile";
import ProfileEditPage from "./routes/profile-edit";
import Root from "./routes/root";
import Selection from "./routes/selection";
import AdminScan from "./routes/admin-scan";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorPage/>,
    },

    {
        path: "/selection",
        element: <Selection/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/calendar",
        element: <Calendar/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/scan",
        element: <AdminScan/>,
        errorElement: <ErrorPage/>,
    },
  {
    path: "/me",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/me/edit",
    element: <ProfileEditPage />,
    errorElement: <ErrorPage />,
  }
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);