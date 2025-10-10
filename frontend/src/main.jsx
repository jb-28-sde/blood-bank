import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import store from "./redux/store.js";
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx";
import PublicRoute from "./components/Routes/PublicRoute.jsx";
import Donar from "./pages/Dashboard/Donar.jsx";
import Hospital from "./pages/Dashboard/Hospital.jsx";
import Organisation from "./pages/Dashboard/Organisation.jsx";
import Consumer from "./pages/Dashboard/Consumer.jsx";
import Donation from "./pages/Donation.jsx";
import Analytics from "./pages/Dashboard/Analytics.jsx";
import DonarList from "./pages/Admin/DonarList.jsx";
import HospitalList from "./pages/Admin/HospitalList.jsx";
import OrganisationList from "./pages/Admin/OrganisationList.jsx";
import AdminHome from "./pages/Admin/AdminHome.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/donar",
        element: (
          <ProtectedRoute>
            <Donar />
          </ProtectedRoute>
        ),
      },
        {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        ),
      },
         {
        path: "/donar-list",
        element: (
          <ProtectedRoute>
            <DonarList />
          </ProtectedRoute>
        ),
      },
         {
        path: "/hospital-list",
        element: (
          <ProtectedRoute>
            <HospitalList />
          </ProtectedRoute>
        ),
      },
         {
        path: "/organisation-list",
        element: (
          <ProtectedRoute>
            <OrganisationList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/hospital",
        element: (
          <ProtectedRoute>
            <Hospital />
          </ProtectedRoute>
        ),
      },
        {
        path: "/analytics",
        element: (
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "/consumer",
        element: (
          <ProtectedRoute>
            <Consumer />
          </ProtectedRoute>
        ),
      },
           {
        path: "/donation",
        element: (
          <ProtectedRoute>
            <Donation/>
          </ProtectedRoute>
        ),
      },

      {
        path: "/organisation",
        element: (
          <ProtectedRoute>
            <Organisation />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
