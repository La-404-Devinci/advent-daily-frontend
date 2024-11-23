import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import AdminProfile from "./routes/admin-profile.jsx";
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
        path: "/leaderboard",
        element: <Leaderboard/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/ranking",
        element: <Ranking/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/me",
        element: <Profile/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/me/edit",
        element: <ProfileEditPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/scan",
        element: <AdminScan/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/profile/:userUuid",
        element: <AdminProfile/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/dashboard",
        element: <Dashboard404/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/dashboard/asso/:id",
        element: <Asso/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/dashboard/user/:id",
        element: <User/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "*",
        element: <NotFoundPage/>,
        errorElement: <ErrorPage/>,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
