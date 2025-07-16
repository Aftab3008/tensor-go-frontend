import AuthLayout from "@/components/Layout/AuthLayout";
import ProtectedLayout from "@/components/Layout/ProtectedLayout";
import RootLayout from "@/components/Layout/RootLayout";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import NotFound from "@/pages/not-found/NotFound";
import Cart from "@/pages/root/Cart";
import Home from "@/pages/root/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import { VerifyOtp } from "./pages/auth/VerifyOtp";
import AuthNotFound from "./pages/not-found/AuthNotFound";
import Profile from "./pages/root/Profile";
import { rootLoader } from "./services/rootLoader";
import { AdminDashboard } from "./pages/root/AdminDashBoard";
import Success from "./pages/root/Success";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: rootLoader,
    shouldRevalidate: ({ currentUrl, nextUrl }) => {
      return false;
    },
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        errorElement: <AuthNotFound />,
        children: [
          { path: "signin", element: <SignIn /> },
          { path: "signup", element: <SignUp /> },
          { path: "verify-email", element: <VerifyOtp /> },
          { path: "*", element: <AuthNotFound /> },
        ],
      },
      {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Home /> },
          { path: "cart", element: <Cart /> },
          {
            element: <ProtectedLayout />,
            children: [
              {
                path: "my-profile",
                element: <Profile />,
                children: [{ index: true, element: <Profile /> }],
              },
              {
                path: "admin/dashboard",
                element: <AdminDashboard />,
              },
              {
                path: "checkout/success",
                element: <Success />,
              },
            ],
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
