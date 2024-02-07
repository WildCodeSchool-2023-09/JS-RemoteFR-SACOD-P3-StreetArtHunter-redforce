import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import UserProfil from "./pages/UserProfil";
import Map from "./pages/Map";
import Admin from "./pages/Admin";
import Gallery from "./pages/Gallery";
import Camera from "./pages/Camera";
import UserProvider, { useUser } from "./context/UserContext";
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
    element: <ProtectedMap />,
  },
  {
    path: "/user-profil",
    element: <ProtectedUserProfile />,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin />,
  },
  {
    path: "/galerie",
    element: <ProtectedGallery />,
  },
  {
    path: "/camera",
    element: <ProtectedCamera />,
  },
]);

function ProtectedUserProfile() {
  const { user } = useUser();

  if (user) {
    return <UserProfil />;
  }

  return <Navigate to="/" />;
}

function ProtectedMap() {
  const { user } = useUser();

  if (user) {
    return <Map />;
  }

  return <Navigate to="/" />;
}

function ProtectedAdmin() {
  const { user } = useUser();

  if (user) {
    if (user.isAdmin) {
      return <Admin />;
    }

    return <Navigate to="/" />;
  }

  return <Navigate to="/" />;
}

function ProtectedGallery() {
  const { user } = useUser();

  if (user) {
    return <Gallery />;
  }

  return <Navigate to="/" />;
}

function ProtectedCamera() {
  const { user } = useUser();

  if (user) {
    return <Camera />;
  }

  return <Navigate to="/" />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </UserProvider>
  </React.StrictMode>
);
