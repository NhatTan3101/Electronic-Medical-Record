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
import PatientProfile from "../pages/profile/patient-profile/PatientProfile";
import DoctorProfile from "../pages/profile/doctor-profile/DoctorProfile";
import classes from "./Router.module.scss";
import { ScheduleCalendarPatient } from "../pages/schedule-calendar/schedule-calendar-patient/ScheduleCalendarPatient";
import { ScheduleCalendarDoctor } from "../pages/schedule-calendar/schedule-calendar-doctor/ScheduleCalendarDoctor";

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
        path: "patient-profile",
        element: <PatientProfile />,
      },
      {
        path: "doctor-profile",
        element: <DoctorProfile />,
      },
      {
        path: "history/:userId/:recordId",
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
      {
        path: "/schedule-calendar/patient",
        element: <ScheduleCalendarPatient />,
      },
      {
        path: "/schedule-calendar/doctor",
        element: <ScheduleCalendarDoctor />,
      },
    ],
  },
]);
