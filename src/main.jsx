// src/main.jsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import AdminScan from "./routes/admin-scan";
import Asso from "./routes/asso.jsx";
import Calendar from "./routes/calendar";
import Dashboard404 from "./routes/dashboard-404.jsx";
import ErrorPage from "./routes/error-page";
import Leaderboard from "./routes/leaderboard";
import Login from "./routes/login";
import NotFoundPage from "./routes/not-found";
import Profile from "./routes/profile";
import ProfileEditPage from "./routes/profile-edit";
import Ranking from "./routes/ranking";
import Register from "./routes/register.jsx";
import Root from "./routes/root";
import Selection from "./routes/selection";
import User from "./routes/user.jsx";
import AdminProfile from "./routes/admin-profile.jsx";
import ConfirmationEmail from "./routes/confirmation-email.jsx";
import ProtectedRoute from "./components/protected-route.jsx";

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
        path: "/register",
        element: <Register/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/confirmation-email",
        element: <ConfirmationEmail/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/selection",
        element: <Selection/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/calendar",
        element: <ProtectedRoute><Calendar/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/scan",
        element: <ProtectedRoute><AdminScan/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/profile",
        element: <ProtectedRoute><AdminProfile/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/leaderboard",
        element: <ProtectedRoute><Leaderboard/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/ranking",
        element: <ProtectedRoute><Ranking/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/me",
        element: <ProtectedRoute><Profile/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/me/edit",
        element: <ProtectedRoute><ProfileEditPage/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/dashboard",
        element: <ProtectedRoute><Dashboard404/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/dashboard/asso/:id",
        element: <ProtectedRoute><Asso/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/dashboard/user/:id",
        element: <ProtectedRoute><User/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "*",
        element: <NotFoundPage/>,
        errorElement: <ErrorPage/>,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router}/>
);