import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Login from "./routes/login";
import Calendar from "./routes/calendar";
import Selection from "./routes/selection";
import AdminScan from "./routes/admin-scan";
import Leaderboard from "./routes/leaderboard";

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
        path: "/admin-scan",
        element: <AdminScan/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/leaderboard",
        element: <Leaderboard/>,
        errorElement: <ErrorPage/>,
    }


]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);