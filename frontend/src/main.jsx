import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import UserProfil from "./pages/UserProfil";
import App from "./App";
import Map from "./pages/Map";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Map",
    element: <Map />,
  },
  {
    path: "/user-profil",
    element: <UserProfil />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
