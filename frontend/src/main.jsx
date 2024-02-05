import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import UserProfil from "./pages/UserProfil";
import Map from "./pages/Map";
import Admin from "./pages/Admin";
import Gallery from "./pages/Gallery";
import Camera from "./pages/Camera";
import UserProvider from "./context/UserContext";
import MapVisitor from "./pages/MapVisitor";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
  {
    path: "/map",
    element: <Map />,
  },
  {
    path: "/mapVisitor",
    element: <MapVisitor />,
  },
  {
    path: "/user-profil",
    element: <UserProfil />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/galerie",
    element: <Gallery />,
  },
  {
    path: "/camera",
    element: <Camera />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </UserProvider>
  </React.StrictMode>
);
