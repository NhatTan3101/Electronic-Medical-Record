import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import About from "../pages/about/About";
import MedicalHistory from "../pages/medicalhistory/MedicalHistory";
import MyMedicalHistory from "../pages/my-medical-history/MyMedicalHistory";
import Chatbox from "../pages/chatbox/Chatbox";
import Profile from "../pages/profile/Profile";
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
        path: "history/:userId",
        element: <MedicalHistory />,
      },
      {
        path: "/history",
        element: <MyMedicalHistory />,
      },
      {
        path: "/chatbox",
        element: <Chatbox />,
      },
    ],
  },
]);
