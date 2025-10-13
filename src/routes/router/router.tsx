import { createBrowserRouter } from "react-router";
import RootLayout from "../../layouts/RootLayout/RootLayout";
import Home from "../../pages/Home/Home";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Login from "../../Auth/Login/Login";
import Register from "../../Auth/Register/Register";
import Profile from "../../pages/Profile/Profile";
import ForgetPassword from "../../Auth/ForgetPassword/ForgetPassword";
import EditProfile from "../../pages/Profile/EditProfile/EditProfile";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import BackbencherControl from "../../components/DashboardComponent/BackbencherControl/BackbencherControl";

export const route = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/:firstName/:uid",
                element: <Profile></Profile>
            },
            {
                path: "/edit-profile/:firstName/:uid",
                element: <EditProfile></EditProfile>
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "forgot-password",
                element: <ForgetPassword></ForgetPassword>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: "bb",
                element: <BackbencherControl></BackbencherControl>
            }
        ]
    }
])