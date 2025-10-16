// route.tsx - Updated with protected routes
import { createBrowserRouter, Navigate } from "react-router";
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
import About from "../../pages/About/About";
import Contact from "../../pages/Contact/Contact";
import ProtectedRoute from "../../components/sharedItems/ProtectedRoute/ProtectedRoute";
import Unauthorized from "../../components/sharedItems/Unauthorized/Unauthorized";
import MentorLearning from "../../components/Mentor/MentorLearning/MentorLearning";
import StudentWorkstation from "../../components/Student/StudentWorkstation/StudentWorkstation";
import UserDashboard from "../../components/DashboardComponent/UserDashboard/UserDashboard";

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
                element: (
                    <ProtectedRoute>
                        <EditProfile />
                    </ProtectedRoute>
                )
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
            {
                path: "/unauthorized",
                element: <Unauthorized />
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
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute requiredRole="user">
                        <UserDashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: "bb",
                element: (
                    <ProtectedRoute requiredRole="admin">
                        <BackbencherControl />
                    </ProtectedRoute>
                )
            },
            {
                path: "learning",
                element: (
                    <ProtectedRoute requiredRole="mentor">
                        <MentorLearning />
                    </ProtectedRoute>
                )
            },
            {
                path: "workstation",
                element: (
                    <ProtectedRoute requiredRole="student">
                        <StudentWorkstation />
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" replace />
    }
]);