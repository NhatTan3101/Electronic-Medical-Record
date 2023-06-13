import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import About from "../pages/about/About";
import MedicalHistory from "../pages/medicalhistory/MedicalHistory";
import Profile from "../pages/profile/Profile";
import PatientList from "../pages/patientlist/PatientList";
import classes from "./Router.module.scss";

export default createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <div className={classes.layout}>
        <Navbar />
        <div className={classes.content}>
          <Outlet />
          {/* <Footer /> */}
        </div>
      </div>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "history",
        element: <MedicalHistory />,
      },
      {
        path: "patientlist",
        element: <PatientList />,
      },
    ],
  },
]);
